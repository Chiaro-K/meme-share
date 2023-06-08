import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IPost, defaultPost } from 'src/app/models/Post';
import { PostService } from 'src/app/services/posts/postService';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PostPage implements OnInit {
  postId: string = "";
  post: IPost = defaultPost;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService) {

    this.route.params.subscribe(params => {
      this.postId = params['postId'];

      console.log(this.postId);

      this.getPost(this.postId);
    });
  }

  ngOnInit() {
  }

  getPost(postId: string) {
    this.postService.getPost(postId).then(res => {
      this.post = res.data;

      console.log(this.post);
    });
  }
}
