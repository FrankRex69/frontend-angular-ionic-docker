/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { UsersState, UserStore} from '../users-store/users.store';
import { QueryEntity } from '@datorama/akita';

@Injectable({
    providedIn: 'root'
  })
  export class UserQuery extends QueryEntity<UsersState> {
  
    selectAreUserLoaded$ = this.select(state => {
      return state.selectAreUserLoaded;
    });
  
    constructor(protected store: UserStore) {
      super(store);
    }
  }