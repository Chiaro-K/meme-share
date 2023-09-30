import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PostService } from '../../services/posts/postService';
import { HttpClientModule } from '@angular/common/http';
import { IPost } from '../../models/Post';
import { ModalController } from '@ionic/angular';
import { PostComponent } from 'src/app/components/post/post.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadComponent } from 'src/app/components/upload/upload.component';

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
    private loadingController: LoadingController
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

  getPosts() {
    this.postService
      .getAllPosts(this.capitalize(this.contentType))
      .then((res) => {
        console.log('res', res);
        this.posts = res.data;
      });
  }

  async viewPost(post: IPost): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PostComponent,
      componentProps: {
        post: post,
      },
    });

    // render modal inside active tab page, so tab switch is possible with opened modal
    const activeTabPage = document
      .querySelector('ion-content')!
      .closest('.ion-page');
    activeTabPage!.appendChild(modal);

    await modal.present();
  }

  async uploadIsthombe() {
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
  }

  // enterAnimation = (baseEl: HTMLElement) => {
  //   const root = baseEl.shadowRoot;

  //   const backdropAnimation = this.animationCtrl
  //     .create()
  //     .addElement(root!.querySelector('ion-backdrop')!)
  //     .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

  //   const wrapperAnimation = this.animationCtrl
  //     .create()
  //     .addElement(root!.querySelector('.modal-wrapper')!)
  //     .keyframes([
  //       { offset: 0, opacity: '0', transform: 'scale(0)' },
  //       { offset: 1, opacity: '0.99', transform: 'scale(1)' },
  //     ]);

  //   return this.animationCtrl
  //     .create()
  //     .addElement(baseEl)
  //     .easing('ease-out')
  //     .duration(150)
  //     .addAnimation([backdropAnimation, wrapperAnimation]);
  // };

  // leaveAnimation = (baseEl: HTMLElement) => {
  //   return this.enterAnimation(baseEl).direction('reverse');
  // };

  lowerCase(pt: string) {
    return pt.toLowerCase();
  }
  capitalize(pt: string) {
    return pt.charAt(0).toUpperCase() + pt.slice(1);
  }
}
