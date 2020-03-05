import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserImageModalPageRoutingModule } from './user-image-modal-routing.module';

import { UserImageModalPage } from './user-image-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserImageModalPageRoutingModule
  ],
  declarations: [UserImageModalPage]
})
export class UserImageModalPageModule {}
