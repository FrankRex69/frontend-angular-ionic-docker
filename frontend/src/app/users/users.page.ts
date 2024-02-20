/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

import { IresponseUser } from '@commons/interfaces/users.interface';

import { UsersState } from './users-store/users.store';
import { UserQuery } from './users-query/users.query';

import { UserService } from './users.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'users',
  templateUrl: './users-template-html/users.page.html',
  styleUrls: ['./users-template-html/users.page.scss'],
})
export class UsersPage implements OnInit {

  usersToBeUpdated: IresponseUser;
  isUpdateActivated = false;

  userToBeCreated: IresponseUser;
  isCreateActivated: boolean;

  userSub: Subscription;
  updateUserSub: Subscription;
  deleteUserSub: Subscription;
  createUserSub: Subscription;

  cstate: UsersState;

  users$: Observable<IresponseUser[]> = this.userQuery.selectAll();

  dataReturned: any;

  constructor(
    private userService: UserService,
    private userQuery: UserQuery
  ) { }

  ngOnInit() {
    this.userSub = this.userQuery.selectAreUserLoaded$.pipe(
      filter(areUserLoaded => !areUserLoaded),
      switchMap(areUserLoaded => {
        if (!areUserLoaded) {
          return this.userService.getAllUsers();
        }
      })
    ).subscribe(result => {});
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.deleteUserSub) {
      this.deleteUserSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
