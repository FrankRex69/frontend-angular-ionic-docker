import { Component } from '@angular/core';
import { IupdateFormDTO } from '@commons/interfaces/list-item.interface';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ListItemService } from '../list-item.service';

@Component({
  selector: 'app-list-item-modal-update',
  templateUrl: './list-item-modal-update.component.html',
  styleUrls: ['./list-item-modal-update.component.scss'],
})
export class ListItemModalUpdateComponent {

  listItemToBeUpdated: IupdateFormDTO;
  isUpdateActivated = false;
  updateListItemSub: Subscription;

  constructor(
    private listItemService: ListItemService,
    private modalController: ModalController
    ) {}

  async updateListItemModal(updateForm: { value: IupdateFormDTO }){
    this.updateListItemSub = this.listItemService.updateListItem(
      updateForm.value.id, updateForm.value).subscribe(result => console.log(result)
    );
    this.closeModal();
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

}
