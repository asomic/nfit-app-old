import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanIndexPage } from './plan-index.page';

const routes: Routes = [
  {
    path: '',
    component: PlanIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanIndexPageRoutingModule {}
