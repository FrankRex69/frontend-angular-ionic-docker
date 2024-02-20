import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { IresponseListItem } from '@commons/interfaces/list-item.interface';
import { IcreateUsersDTO } from '@commons/interfaces/users.interface';


import { SignInService } from './sign-in.service';
// import { ListItemService } from '../list-item.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sign-in.modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SignInModal implements OnInit {

  modalTitle: string;
  modelId: number;

  createListItemSub: Subscription;
  isCreateActivated: boolean;
  listItemToBeCreated: IresponseListItem;

  constructor(
    private modalController: ModalController,
    private signInService: SignInService
  ) { }

  ngOnInit() {}

  createSignIn(createForm: any) {
    console.log(createForm.value.username);
    console.log(createForm.value.password);
    const dataCreateForm: IcreateUsersDTO  = {
      username: createForm.value.username,
      password: createForm.value.password
    };
    this.signInService.createUsers(dataCreateForm);
    this.closeModal();
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }
}
