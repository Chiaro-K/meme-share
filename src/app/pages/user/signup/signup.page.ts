import { Component, ContentChild, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonInput } from '@ionic/angular';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

import { Animation, AnimationController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SignupPage implements OnInit {
  @ContentChild(IonInput)
  input!: IonInput;

  contentType = 'login';
  showPassword = false;
  loading = false;

  validationMessages = {
    username: [{ type: 'required', message: 'Please Enter your Full Names' }],
    email: [
      { type: 'required', message: 'Enter your Email Adress' },
      {
        type: 'pattern',
        meesage: 'Please the Email Entered is Incorrect. Try again..',
      },
    ],
    password: [
      { type: 'required', message: 'password is required here' },
      { type: 'minlength', message: 'Passwrd must be at least 6 character' },
    ],
  };

  ValidationFormUser: FormGroup = this.formbuilder.group({
    username: new FormControl('', Validators.compose([Validators.required])),

    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])
    ),

    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
  });

  constructor(
    private formbuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    private auth: FirebaseService
  ) {}

  ngOnInit() {}

  login() {
    console.log('LOGGIN IN!');
    const userForm = this.ValidationFormUser.value;
    console.log('USERFORM: ', userForm);
    if (userForm.email && userForm.password) this.loading = true;
    this.auth
      .SignIn(userForm.email, userForm.password)
      .then(async (res) => {
        console.log('RES', res);
        // const alert = await this.alertCtrl.create({
        //   header: 'Alert',
        //   message: res || '',
        //   buttons: ['OK'],
        // });
        // await alert.present();

        this.loading = false;
      })
      .catch((err) => {});
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
}
