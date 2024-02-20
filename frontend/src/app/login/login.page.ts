import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IresponseUser } from '@commons/interfaces/users.interface';
import { LoginService } from './login.service';

import { SignInModal } from '../sign-in/sign-in-modal/sign-in-modal.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'login',
  templateUrl: './login-template-html/login.html',
  styleUrls: ['./login-template-html/login.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private loginService: LoginService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.loginService.getLoginToken();
  }

  async checkLogin(loginForm: { value: IresponseUser }){
    const credentialLogin = {
      userLogin: loginForm.value.username,
      passLogin: loginForm.value.password
    };
    await this.loginService.checkLoginService(credentialLogin);
  }

  async openModalSignIn() {
    const modal = await this.modalController.create({
      component: SignInModal
    });
    return await modal.present();
  }

}
