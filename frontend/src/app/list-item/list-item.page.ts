/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

import { IresponseListItem } from '@commons/interfaces/list-item.interface';

import { ListItemState } from './list-item-store/list-item.store';
import { ListItemQuery } from './list-item-query/list-item.query';

import { ListItemService } from './list-item.service';

import { ListItemModal } from './list-item-modal/list-item-modal.component';
import { ListItemModalUpdateComponent } from './list-item-modal-update/list-item-modal-update.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'list-item',
  templateUrl: './list-item-template-html/list-item.page.html',
  styleUrls: ['./list-item-template-html/list-item.page.scss'],
})
export class ListItemPage implements OnInit {

  listItemToBeUpdated: IresponseListItem;
  isUpdateActivated = false;

  listItemToBeCreated: IresponseListItem;
  isCreateActivated: boolean;

  listItemSub: Subscription;
  updateListItemSub: Subscription;
  deleteListItemSub: Subscription;
  createListItemSub: Subscription;

  cstate: ListItemState;

  listItems$: Observable<IresponseListItem[]> = this.listItemQuery.selectAll();

  dataReturned: any;

  constructor(
    private listItemService: ListItemService,
    private listItemQuery: ListItemQuery,
    public modalController: ModalController
    ) {
  }

 // -- Modal
  async openModal() {
    const modal = await this.modalController.create({
      component: ListItemModal
    });
    return await modal.present();
  }

  async openModalUpdate(listItem: IresponseListItem) {
    const modal = await this.modalController.create({
      component: ListItemModalUpdateComponent,
      componentProps: {
        id: listItem.id,
        campo1: listItem.campo1,
        campo2: listItem.campo2
      }
    });
    return await modal.present();
  }

  // -- end modal

  ngOnInit() {
    this.listItemSub = this.listItemQuery.selectAreListItemLoaded$.pipe(
      filter(areListItemLoaded => !areListItemLoaded),
      switchMap(areListItemLoaded => {
        if (!areListItemLoaded) {
          return this.listItemService.getAllListItems();
        }
      })
    ).subscribe(result => {});
  }

  deleteListItem(listItemId: number) {
    this.deleteListItemSub = this.listItemService.deleteListItem(listItemId)
      .subscribe(result => {
      console.log(result);
    });
  }

  ngOnDestroy() {
    if (this.listItemSub) {
      this.listItemSub.unsubscribe();
    }

    if (this.deleteListItemSub) {
      this.deleteListItemSub.unsubscribe();
    }

    if (this.listItemSub) {
      this.listItemSub.unsubscribe();
    }
  }

  logOut() {
    this.listItemService.logOut();
  }

}
