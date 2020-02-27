import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanShowPage } from './plan-show.page';

const routes: Routes = [
  {
    path: '',
    component: PlanShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanShowPageRoutingModule {}
