import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { UsersPage } from './users.page';
import { UserService } from './users.service';
import { UsersPageRoutingModule } from './users-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    HttpClientModule
  ],
  declarations: [UsersPage],
  providers: [UserService],
  exports: [UsersPage],
})
export class UsersPageModule {}
