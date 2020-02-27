import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanIndexPageRoutingModule } from './plan-index-routing.module';

import { PlanIndexPage } from './plan-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanIndexPageRoutingModule
  ],
  declarations: [PlanIndexPage]
})
export class PlanIndexPageModule {}
