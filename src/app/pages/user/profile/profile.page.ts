import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageService } from 'src/app/services/image.service';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { MenuController } from '@ionic/angular';
import { PostService } from 'src/app/services/posts/postService';
import { IPost } from 'src/app/models/Post';
import { HttpResponse } from '@capacitor/core';
import { UserService } from 'src/app/services/posts/userService';
import { IUser } from 'src/app/models/User';
import { PostComponent } from 'src/app/components/post/post.component';

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
  profile?: any;
  user?: IUser;
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
    private postService: PostService,
    private userService: UserService,
    private modalCtrl: ModalController,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;

      console.log('profile: ', this.profile);
      this.userService.getUserByFireId(this.profile['id']).then((res) => {
        console.log('userRes: ', res);
        this.user = res.data;
      });

      this.postService.getUserUploads(this.profile['id']).then((res) => {
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

  async viewPost(post: IPost): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PostComponent,
      componentProps: {
        post: post,
      },
    });

    // render modal inside active tab page, so tab switch is possible with opened modal
    // const activeTabPage = document
    //   .querySelector('ion-content')!
    //   .closest('.ion-page');
    // activeTabPage!.appendChild(modal);

    await modal.present();
  }

  postsCount(posts: any[]) {
    this.postCount = posts.length;
  }

  postsViews(posts: any[]) {
    console.log('posts: ', posts);
    this.postViews = posts.reduce(function (prev, curr) {
      return prev + curr.viewCount;
    }, 0);

    console.log('postViews: ', this.postViews);
  }

  onSegmentChange() {
    console.log('onSegmentChange');

    if (this.contentType === 'uploads' && this.posts && this.profile) {
      console.log('profile: ', this.profile);
      console.log('uploads');
      this.postService
        .getUserUploads(this.profile['id'])
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
