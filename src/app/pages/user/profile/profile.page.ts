import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageService } from 'src/app/services/image.service';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MenuController } from '@ionic/angular';
import { PostService } from 'src/app/services/posts/postService';
import { IPost } from 'src/app/models/Post';
import { HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProfilePage implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet | undefined;

  contentType = 'uploads';
  profile: any;
  posts?: any;
  postCount: number = 0;
  postViews: number = 0;

  constructor(
    private avatarService: ImageService,
    private authService: FirebaseService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private menu: MenuController,
    private postService: PostService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;

      console.log('profile: ', this.profile);
      this.postService.getUserUploads(this.profile['uid']).then((res) => {
        if (res) {
          this.posts = res.data;
          this.postsCount(res.data);
          this.postsViews(res.data);
        }
      });
    });
  }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof ActivationStart && this.outlet !== undefined)
        console.log('snapshot: ', e.snapshot);
      // this.outlet.deactivate();
    });

    this.menu.close();
  }

  postsCount(posts: any[]) {
    this.postCount = posts.length;
  }

  postsViews(posts: any[]) {
    console.log("posts: ", posts);
    this.postViews = posts.reduce(function (prev, curr) {
      prev + curr.viewCount;
    }, 0);

    console.log("postViews: ", this.postViews);
  }

  onSegmentChange() {
    console.log('onSegmentChange');

    if (this.contentType === 'uploads' && this.posts && this.profile) {
      console.log('uploads');
      this.postService
        .getUserUploads(this.profile['uid'])
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image, 'avatar');
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
