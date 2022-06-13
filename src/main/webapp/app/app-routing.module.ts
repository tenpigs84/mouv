import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

const LAYOUT_ROUTES = [...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        /* {
                    path: 'admin',
                    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
                }, */
        {
          path: 'entities',
          data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule),
        },
        {
          path: '',
          loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule),
        },
        ...LAYOUT_ROUTES,
      ],
      {
        // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
        enableTracing: DEBUG_INFO_ENABLED,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
