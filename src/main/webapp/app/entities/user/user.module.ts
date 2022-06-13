import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { UserUpdateComponent } from './update/user-update.component';
import { UserSharedModule } from './user-shared.module';
import { UserRoutingModule } from './route/user-routing.module';

@NgModule({
  imports: [SharedModule, UserSharedModule, UserRoutingModule],
  declarations: [UserUpdateComponent],
  entryComponents: [UserUpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
