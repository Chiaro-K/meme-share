import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostService } from '../../services/posts/postService';
import { PostService2 } from '../../services/posts/postService2';
import { PostType } from '../../models/PostTypes';
import { map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { IPost } from '../../models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class HomePage implements OnInit {
  contentType = "trending";
  posts: IPost[] = [];
  constructor(private postService: PostService2) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    const userId = 'D407A68B-85FF-4AAA-9F93-0F1784D810EC';
    // this.postService.getPosts(userId, PostType.memes).pipe(
    //   map(results => results));

    this.postService.getAllPosts().then(res =>{
      console.log(res);
      this.posts = res.data;
    });
  }
}
