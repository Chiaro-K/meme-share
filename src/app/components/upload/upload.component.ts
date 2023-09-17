import { Component, OnInit } from '@angular/core';
import {
  NavParams,
  IonicModule,
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IAddPost, defaultAddPost } from 'src/app/models/Post';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { PostService } from 'src/app/services/posts/postService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class UploadComponent implements OnInit {
  post: IAddPost = defaultAddPost;

  constructor(
    private navParams: NavParams,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private imageService: ImageService,
    private postService: PostService,
    public modalCtrl: ModalController,
    public router: Router
  ) {
    this.post.imageUrl = this.navParams.get('media')?.base64String;
    this.post.media = this.navParams.get('media');
  }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async createPost() {
    if (!this.post.media) {
      const alert = await this.alertController.create({
        header: 'Upload failed',
        message: 'Please include media',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const loading = await this.loadingController.create();
      await loading.present();

      await this.imageService
        .uploadImage(this.post.media, 'post')
        .then((res) => {
          var to_save = this.post;
          to_save.imageUrl = res;
          to_save.media = undefined;

          this.postService.createPost(to_save).then((api_res) => {
            console.log(api_res);
            if (api_res.status === 200) {
              this.router.navigate(['/']);
            } else {
              console.log(api_res);
            }
          });
        });

      loading.dismiss();
    }
  }
}
