import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseHistoryPageRoutingModule } from './clase-history-routing.module';

import { ClaseHistoryPage } from './clase-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseHistoryPageRoutingModule
  ],
  declarations: [ClaseHistoryPage]
})
export class ClaseHistoryPageModule {}
