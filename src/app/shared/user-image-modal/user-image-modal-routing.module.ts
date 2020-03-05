import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserImageModalPage } from './user-image-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UserImageModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserImageModalPageRoutingModule {}
