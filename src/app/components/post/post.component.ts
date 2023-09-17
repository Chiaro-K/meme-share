import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, IonicModule, ModalController, NavController, NavParams } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { PostService } from 'src/app/services/posts/postService';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PostComponent implements OnInit {
  post: any;

  constructor(private animationCtrl: AnimationController, public modalCtrl: ModalController, private navParams: NavParams, public router: Router) {
    console.log("LOADED POST COMPONENT");
    this.post = this.navParams.get('post');

    console.log(this.post);
  }

  viewUser() {
    this.router.navigate(['/view-user'], {
      queryParams: {
        userId: this.post.userId,
        postId: this.post.postId
      }
    });
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


  ngOnInit() { }

  close() {
    this.modalCtrl.dismiss();
  }

}
