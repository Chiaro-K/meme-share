import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostService } from 'src/app/services/posts/postService';
import { Capitalize } from 'src/app/shared/stringUtils';
import { IPost } from 'src/app/models/Post';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SearchPage implements OnInit {
  contentType = 'trending';
  gridRow = [
    [1, 3],
    [1, 2],
    [3, 5],
    [2, 4],
    [4, 5],
  ];
  posts: IPost[] = [];
  rows = 4;
  repeatRows = 'repeat(100, 120px)';
  repeatCols = 'repeat(2, 1fr)';

  constructor(private postService: PostService) {
    this.getPosts();
  }

  ngOnInit() {}

  getPosts() {
    this.postService.getAllPosts(Capitalize(this.contentType)).then((res) => {
      let count = 0;
      let increment = 0;
      let row = 1;

      this.posts = res.data;

      this.posts.forEach((p, i) => {
        if (i % 5 === 0 && i !== 0) {
          increment = row * 5;
          row++;
        }
        if (count === this.gridRow.length) {
          count = 0;
        }

        let x = this.gridRow[count][0] + increment;

        if ([0, 1].includes(count) && row !== 1) {
          x -= 1;
        }
        const y = this.gridRow[count][1] + increment;

        p.gridRow = `${x}/${y}`;
        count++;

        this.rows = y > this.rows ? y : this.rows;
      });
      this.repeatRows = `repeat(${Math.ceil(this.rows)}, 120px)`;

      console.log('new posts: ', this.posts);
    });
  }
}
