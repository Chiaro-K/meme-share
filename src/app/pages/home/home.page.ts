import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AnimationController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { PostService } from '../../services/posts/postService';
import { HttpClientModule } from '@angular/common/http';
import { IPost } from '../../models/Post';
import { ModalController } from '@ionic/angular';
import { PostComponent } from 'src/app/components/post/post.component';
import { Photo } from '@capacitor/camera';
import { Auth } from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
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
    private menuCtrl: MenuController,
    private router: Router,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getPosts();
    this.getPostTypes();
  }

  onSegmentChange(){
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

    //   this.posts = [
    //     {
    //       postId: 'c17c1350-808e-40ab-bbdd-8362b5a70600',
    //       userId: 'd407a68b-85ff-4aaa-9f93-0f1784d810ec',
    //       title: 'Test1',
    //       description: 'Description blah blah',
    //       imageUrl:
    //         'https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0',
    //       tags: 'dog,meme,puppy',
    //       postType: 2,
    //     },
    //     {
    //       postId: '6a7ae9eb-76f5-4cc0-968c-2209c6c928f9',
    //       userId: 'd407a68b-85ff-4aaa-9f93-0f1784d810ec',
    //       title: 'Test2',
    //       description: 'Another Description blah blah',
    //       imageUrl:
    //         'https://www.sheknows.com/wp-content/uploads/2018/08/wtsyliaw0pbyvlspt7mg.jpeg?w=600',
    //       tags: 'dog,puppy',
    //       postType: 2,
    //     },
    //   ];
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

    // const data = await modal.onWillDismiss();
    // console.log(data);
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
