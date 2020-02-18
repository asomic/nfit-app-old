import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
          path: 'dashboard',
          children: [
              {
                path: '',
                loadChildren: () => import('../pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
              },
          ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
