import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileShowPage } from './profile-show.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileShowPageRoutingModule {}
