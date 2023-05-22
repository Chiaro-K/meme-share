import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostService } from '../services/posts/postService';
import { PostType } from '../models/PostTypes';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  contentType = "trending";
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  getPosts() {
    const userId = 'D407A68B-85FF-4AAA-9F93-0F1784D810EC';
    this.postService.getPosts(userId, PostType.memes).pipe(
      map(results => results));
  }
}
