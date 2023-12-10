import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { IPost } from 'src/app/models/Post';
import { PostType } from 'src/app/models/PostTypes';
import { PostService } from 'src/app/services/posts/postService';
import { UserService } from 'src/app/services/posts/userService';
import { Capitalize } from 'src/app/shared/stringUtils';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PostComponent implements OnInit {
  post?: IPost;
  posts?: IPost[];
  user: any;
  userPostCount: number = 0;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    public router: Router,
    private postService: PostService,
    private userService: UserService
  ) {
    this.post = this.navParams.get('post');

    this.post = this.post;
    this.getPosts();
    this.postService.incrementPostView(this.post.postId);

    this.userService.getUser(this.post.userId).then((res: any) => {
      console.log(res);
      this.user = res.data;
      this.userPostCount = this.user.posts?.length;
    });
  }

  viewPost(post: IPost) {
    this.modalCtrl.dismiss(post);
  }

  viewUser() {
    if (this.post) {
      this.router.navigate(['/view-user'], {
        queryParams: {
          userId: this.post.userId,
          postId: this.post.postId,
        },
      });
    }
  }

  getPosts() {
    this.postService
      .getAllPosts(Capitalize(PostType[this.post!.postType]))
      .then((res) => {
        console.log('res', res);
        const posts = res.data;
        this.posts = posts.filter((f: IPost) => f.postId !== this.post!.postId);
      });
  }

  savePost() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.postService.savePost(this.post!.postId, userId);
    }
  }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
