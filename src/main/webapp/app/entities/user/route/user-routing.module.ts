import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserComponent } from '../list/user.component';
import { UserUpdateComponent } from '../update/user-update.component';
import { UserRoutingResolveService } from './user-routing-resolve.service';
import { CommonTableDataResolve } from 'app/shared/util/common-table-data-resolve';

const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: {
      commonTableData: CommonTableDataResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'testdele06App.user.home.title',
      entityClassName: 'User',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserUpdateComponent,
    resolve: {
      user: UserRoutingResolveService,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testdele06App.user.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserUpdateComponent,
    resolve: {
      user: UserRoutingResolveService,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testdele06App.user.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserUpdateComponent,
    resolve: {
      user: UserRoutingResolveService,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testdele06App.user.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoute)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
