import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserShowPageRoutingModule } from './user-show-routing.module';

import { UserShowPage } from './user-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserShowPageRoutingModule
  ],
  declarations: [UserShowPage]
})
export class UserShowPageModule {}
