import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanShowPageRoutingModule } from './plan-show-routing.module';

import { PlanShowPage } from './plan-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanShowPageRoutingModule
  ],
  declarations: [PlanShowPage]
})
export class PlanShowPageModule {}
