import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './list/user.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [UserComponent],
  exports: [UserComponent],
  entryComponents: [UserComponent],
})
export class UserSharedModule {}
