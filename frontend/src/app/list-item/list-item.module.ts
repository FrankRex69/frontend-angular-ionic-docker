import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListItemPage } from './list-item.page';
import { ListItemService } from './list-item.service';
import { ListItemPageRoutingModule } from './list-item-routing.module';

import { ListItemModal } from './list-item-modal/list-item-modal.component';
import { ListItemModalUpdateComponent } from './list-item-modal-update/list-item-modal-update.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListItemPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListItemPage, ListItemModal, ListItemModalUpdateComponent],
  providers: [ListItemService],
  exports: [ListItemPage],
  entryComponents: [ ListItemModalUpdateComponent ]
})
export class ListItemPageModule {}

