import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// layout
import { LayoutProComponent } from '@brand';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

const routes: Routes = [
  {
    path: '',
    data: {
      authorities: ['ROLE_USER', 'ROLE_ADMIN'],
    },
    canActivate: [UserRouteAccessService],
    component: LayoutProComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'pro',
        loadChildren: () => import('./pro/pro.module').then(m => m.ProModule),
      },
      {
        path: 'sys',
        loadChildren: () => import('./sys/sys.module').then(m => m.SysModule),
      },
      {
        path: 'ec',
        loadChildren: () => import('./ec/ec.module').then(m => m.ECModule),
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule),
      },
      {
        path: 'chart',
        loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule),
      },
      {
        path: 'other',
        loadChildren: () => import('./other/other.module').then(m => m.OtherModule),
      },
      {
        path: 'file',
        loadChildren: () => import('./file/file.module').then(m => m.FileModule),
      },
    ],
  },
  // passport
  {
    path: '',
    loadChildren: () => import('./passport/passport.module').then(m => m.PassportModule),
  },
  {
    path: 'exception',
    loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule),
  },
  // 单页不包裹Layout
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
