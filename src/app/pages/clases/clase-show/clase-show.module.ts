import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseShowPageRoutingModule } from './clase-show-routing.module';

import { ClaseShowPage } from './clase-show.page';
import { ClaseModalPage } from '../clase-modal/clase-modal.page';
import { UserImageModalPage } from '../../../shared/user-image-modal/user-image-modal.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseShowPageRoutingModule,
    
  ],
  declarations: [ClaseShowPage, ClaseModalPage, UserImageModalPage],
  entryComponents: [ClaseModalPage, UserImageModalPage]
})
export class ClaseShowPageModule {}
