import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { IresponseListItem } from '@commons/interfaces/list-item.interface';
import { ListItemStore } from './list-item-store/list-item.store';
import { environment } from '../../environments/environment';

@Injectable()
export class ListItemService {

  http: HttpClient;
  store: ListItemStore;

  corsHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  });

  constructor(http: HttpClient, store: ListItemStore, private router: Router) {
    this.http = http;
    this.store = store;
  }

  getAllListItems(): Observable<IresponseListItem[]> {
    const accessToken = localStorage.getItem('access_token');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = { Authorization: 'Bearer ' + accessToken};

    return this.http.get<IresponseListItem[]>(`${environment.apiUrl}/list-item/`, { headers }).pipe(
      tap(listItem => {
        this.store.loadListItem(listItem, true);
      })
    );
  }

  updateListItem(listItemId: number, listItem: IresponseListItem): Observable<any> {
    const token = localStorage.getItem('access_token');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = {Authorization: `Bearer ${token}`};
    return this.http.patch(`${environment.apiUrl}/list-item/${listItemId}`, listItem, { headers }).pipe(
      tap(result => {
        this.store.update(listItemId, listItem);
      })
    );
  }

  createListItem(dto) {
    const token = localStorage.getItem('access_token');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = {Authorization: `Bearer ${token}`};
    this.store.setLoading(true);
    return this.http.post<IresponseListItem>(`${environment.apiUrl}/list-item/`, dto.value, { headers }).pipe(
      take(1),
      catchError((err: HttpErrorResponse) => {
        console.log('🐱‍👤 : err', err);
        return throwError(
          () => new Error(`${err.error.error}: ${err.error.message[0]}`)
        );
      }),
      tap((value: IresponseListItem) => {
        console.log('🐱‍👤 : value', value);
        this.store.add(value);
        this.store.setLoading(false);
      })
    );
  }

  deleteListItem(listItemId: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = {Authorization: `Bearer ${token}`};
    return this.http.delete(`${environment.apiUrl}/list-item/${listItemId}`, { headers }).pipe(
      tap(result => {
        this.store.remove(listItemId);
      })
    );
  }

  logOut(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
