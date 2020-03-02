import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxSelectPageRoutingModule } from './box-select-routing.module';

import { BoxSelectPage } from './box-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxSelectPageRoutingModule,
    ],
})
export class BoxSelectPageModule {}
