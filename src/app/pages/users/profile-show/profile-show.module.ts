import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileShowPageRoutingModule } from './profile-show-routing.module';

import { ProfileShowPage } from './profile-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileShowPageRoutingModule
  ],
  declarations: [ProfileShowPage]
})
export class ProfileShowPageModule {}
