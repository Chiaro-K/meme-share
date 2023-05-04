import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent]
})
export class HomePage implements OnInit {
  contentType = "trending";
  constructor() { }

  ngOnInit() {
  }

  randomHeight(){
    Math.floor(50 + Math.random()*(200 - 50 + 1))
  }

}
