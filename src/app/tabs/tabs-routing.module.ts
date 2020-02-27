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
            {
              path: 'wods/:id',
              loadChildren: () => import('../pages/wods/wod-show/wod-show.module').then( m => m.WodShowPageModule)
            },
        ]
      },
      {
        path: 'clases',
        children: [
            {
              path: '',
              loadChildren: () => import('../pages/clases/clase-index/clase-index.module').then( m => m.ClaseIndexPageModule)
            },
            {
              path: 'clase-type',
              loadChildren: () => import('../pages/clases/select-clase-type/select-clase-type.module').then( m => m.SelectClaseTypePageModule)
            },
            {
              path: 'clase-type/:claseTypeId/select-day',
              loadChildren: () => import('../pages/clases/select-day/select-day.module').then( m => m.SelectDayPageModule)
            },
            {
              path: 'clase-type/:claseTypeId/select-day/:date',
              loadChildren: () => import('../pages/clases/select-hour/select-hour.module').then( m => m.SelectHourPageModule)
            },
            {
              path: ':id',
              loadChildren: () => import('../pages/clases/clase-show/clase-show.module').then( m => m.ClaseShowPageModule)
            },


        ]
    },
    {
      path: 'plans',
      children: [
        {
          path: '',
          loadChildren: () => import('../pages/plans/plan-index/plan-index.module').then( m => m.PlanIndexPageModule)
        },
        {
          path: ':id',
          loadChildren: () => import('../pages/plans/plan-show/plan-show.module').then( m => m.PlanShowPageModule)
        },
      ]
    },
    {
      path: 'profile',
      children: [
        {
          path: '',
          loadChildren: () => import('../pages/users/profile-show/profile-show.module').then( m => m.ProfileShowPageModule)
        },
      ]
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
