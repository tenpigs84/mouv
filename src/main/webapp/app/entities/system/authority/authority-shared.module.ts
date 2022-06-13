import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorityComponent } from './list/authority.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [AuthorityComponent],
  exports: [AuthorityComponent],
  entryComponents: [AuthorityComponent],
})
export class AuthoritySharedModule {}
