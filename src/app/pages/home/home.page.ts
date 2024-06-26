import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PostService } from '../../services/posts/postService';
import { HttpClientModule } from '@angular/common/http';
import { IPost } from '../../models/Post';
import { ModalController } from '@ionic/angular';
import { PostComponent } from 'src/app/components/post/post.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadComponent } from 'src/app/components/upload/upload.component';
import { Capitalize, LowerCase } from 'src/app/shared/stringUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class HomePage implements OnInit {
  contentType = 'trending';
  posts: IPost[] = [];
  postTypes: any[] = [];

  constructor(
    private postService: PostService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPosts();
    this.getPostTypes();
  }

  onSegmentChange() {
    this.getPosts();
  }

  getPostTypes() {
    this.postService.getPostTypes().then((res) => {
      console.log(res);
      this.postTypes = res.data;
    });
  }

  getPosts(event?: any) {
    this.postService.getAllPosts(Capitalize(this.contentType)).then((res) => {
      console.log('res', res);
      this.posts = res.data;

      if (event) {
        event.target.complete();
      }
    });
  }

  async viewPost(post: IPost): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PostComponent,
      componentProps: {
        post: post,
      },
    });

    modal.onDidDismiss().then((res) => {
      console.log('dismiss: ', res);

      if (res.data) {
        if (res.data['postId'] !== post.postId) {
          this.viewPost(res.data);
        }
      }
    });

    // render modal inside active tab page, so tab switch is possible with opened modal
    const activeTabPage = document
      .querySelector('ion-content')!
      .closest('.ion-page');
    activeTabPage!.appendChild(modal);

    await modal.present();
  }

  async uploadIsthombe() {
    //check if user is logged in
    var user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.email) {
      const media = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos, // Camera, Photos or Prompt!
      });

      if (media) {
        console.log('media', media);
        const loading = await this.loadingController.create();
        await loading.present();

        loading.dismiss();

        const modal = await this.modalCtrl.create({
          component: UploadComponent,
          componentProps: {
            media: media,
          },
        });
        await modal.present();
      }
    } else {
      this.router.navigateByUrl('tabs/signup', { replaceUrl: true });
    }
  }

  lowerCase(pt: string) {
    return LowerCase(pt);
  }
}
