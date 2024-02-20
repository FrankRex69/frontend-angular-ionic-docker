import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private router: Router
  ) { }

  listItem() {
    this.router.navigate(['/home/list-item'], {
      skipLocationChange: true,
    });
  }
  users() {
    this.router.navigate(['/home/users'], {
      skipLocationChange: true,
    });
  }
  logOut(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
