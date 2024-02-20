import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { IresponseUser } from '@commons/interfaces/users.interface';
import { UserStore } from './users-store/users.store';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  http: HttpClient;
  store: UserStore;

  corsHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  });

  constructor(http: HttpClient, store: UserStore, private router: Router) {
    this.http = http;
    this.store = store;
  }

  getAllUsers(): Observable<IresponseUser[]> {
    const accessToken = localStorage.getItem('access_token');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = { Authorization: 'Bearer ' + accessToken};

    return this.http.get<IresponseUser[]>(`${environment.apiUrl}/users/`, { headers }).pipe(
      tap(user => {
        this.store.loadUsers(user, true);
      })
    );
  }

  logOut(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
