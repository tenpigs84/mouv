import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AuthorityComponent } from '../list/authority.component';
import { AuthorityUpdateComponent } from '../update/authority-update.component';
import { AuthorityRoutingResolveService } from './authority-routing-resolve.service';
import { CommonTableDataResolve } from 'app/shared/util/common-table-data-resolve';

const authorityRoute: Routes = [
  {
    path: '',
    component: AuthorityComponent,
    resolve: {
      commonTableData: CommonTableDataResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'testdele06App.systemAuthority.home.title',
      entityClassName: 'Authority',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AuthorityUpdateComponent,
    resolve: {
      authority: AuthorityRoutingResolveService,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testdele06App.systemAuthority.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AuthorityUpdateComponent,
    resolve: {
      authority: AuthorityRoutingResolveService,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testdele06App.systemAuthority.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AuthorityUpdateComponent,
    resolve: {
      authority: AuthorityRoutingResolveService,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testdele06App.systemAuthority.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authorityRoute)],
  exports: [RouterModule],
})
export class AuthorityRoutingModule {}
