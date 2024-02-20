import { Injectable } from '@angular/core';

import axios from 'axios';

import { IcreateUsersDTO } from '@commons/interfaces/users.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignInService {


  constructor() {}

  async createUsers(dto: IcreateUsersDTO) {

    console.log(dto.username);


    // const agent = new this.http.Agent({rejectUnauthorized: false});
    const loginToken = localStorage.getItem('login_token');

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = { Authorization: 'Bearer ' + loginToken};

    const dataBody = {
      username: dto.username,
      password: dto.password
    };


    const options = {
      method: 'POST',
      headers,
      url: `${environment.apiUrl}/users/`,
      // httpsAgent: agent,
      data: dataBody
    };

    try {
      // const responseCreateUsers = await axios(options);
      const responseCreateUsers = await axios(options);
      console.log(responseCreateUsers);
      // return 'ciaooo';
    } catch (err: any) {
        if (err.response) {
            // 👇️ log status code here
            console.log('ERR.RESPONSE.STATUS: ' + err.response.status);
            console.log('ERR.RESPONSE.STATUSTEXT: ' + err.response.statusText);
            console.log('ERR.RESPONSE.MESSAGE: ' + err.response.message);
            console.log('ERR.RESPONSE.HEADERS: ' + err.response.headers); // 👉️ {... response headers here}
            console.log('ERR.RESPONSE.DATA: ' + err.response.data); // 👉️ {... response data here}
        } else if (err.request) {
            // 👇️ Request was made, but no response was received
            console.log('ERR.REQUEST: ' + err.request);
            } else {
            // 👇️ An error was thrown when setting up the request
            console.log('ERR.MESSAGE:' + err.message);
        }
    }

  }


}
