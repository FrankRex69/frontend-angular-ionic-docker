/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';

import { EntityStore, StoreConfig } from '@datorama/akita';
import { EntityState } from '@datorama/akita/src/lib/types';

import { IresponseUser} from '@commons/interfaces/users.interface';

export interface UsersState extends EntityState<IresponseUser, number> {
  areUserLoaded: boolean;
}

export function createInitialState(): UsersState {
  return {
    areUserLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UsersState> {

    constructor() {
        super(createInitialState());
    }

    loadUsers(user: IresponseUser[], areUserLoaded: boolean) {
      this.set(user);
      this.update(state => ({
        ...state,
        areUserLoaded
      }));
    }
}
