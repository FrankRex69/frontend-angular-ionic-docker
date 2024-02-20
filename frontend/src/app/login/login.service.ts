import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import axios from 'axios';

import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  http: HttpClient;
  data: any[];

  constructor(
    http: HttpClient,
    private router: Router,
    public alertController: AlertController
    ) {
    this.http = http;
  }

  //----------- methods

  // --- GET
  getLoginToken() {
    axios.get(`${environment.apiUrl}/auth/getLoginToken`)
      .then(response => {
        localStorage.setItem('login_token', response.data.login_token);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // --- POST
  async checkLoginService(credentialLogin: any) {
    const token = localStorage.getItem('login_token');
    axios.post(`${environment.apiUrl}/auth/checkLoginToken`, credentialLogin, { headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`
      }})
      .then(response => {
        if(response.data.status===200){
          localStorage.setItem('access_token', response.data.access_token);
          this.router.navigate(['/home']);
        } else {
          this.openAlert();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  async signIn(){
    this.router.navigate(['/sign-in']);
  }

  private async openAlert() {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Important message',
      message: 'Username/Password not correct',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
