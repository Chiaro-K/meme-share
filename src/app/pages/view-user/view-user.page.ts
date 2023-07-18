import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/posts/userService';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewUserPage implements OnInit {
  user: any;

  constructor(public modalCtrl: ModalController, private userService: UserService, private route: ActivatedRoute, private location: Location) {

    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        this.userService.getUser(params['userId']).then((res: any) => {
          console.log(res);
          this.user = res.data;
        })

      });
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }


}
