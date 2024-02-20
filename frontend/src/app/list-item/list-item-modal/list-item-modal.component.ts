import { Component, OnInit, ViewChild } from '@angular/core';
import { IresponseListItem } from '@commons/interfaces/list-item.interface';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ListItemService } from '../list-item.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'list-item.modal',
  templateUrl: './list-item-modal.component.html',
  styleUrls: ['./list-item-modal.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ListItemModal implements OnInit {

  modalTitle: string;
  modelId: number;

  createListItemSub: Subscription;
  isCreateActivated: boolean;
  listItemToBeCreated: IresponseListItem;

  constructor(
    private modalController: ModalController,
    private listItemService: ListItemService
  ) { }

  ngOnInit() {}

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

  createListItem(createForm: { value: { campo1: string; campo2: string } }) {
    this.createListItemSub = this.listItemService.createListItem(createForm).subscribe((result: any) => {});
    this.closeModal();
  }

}
