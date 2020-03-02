import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseHistoryPage } from './clase-history.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseHistoryPageRoutingModule {}
