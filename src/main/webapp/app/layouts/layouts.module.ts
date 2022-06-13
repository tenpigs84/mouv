import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LayoutModule as CDKLayoutModule } from '@angular/cdk/layout';

import { PRO_ENTRYCOMPONENTS, PRO_COMPONENTS } from './pro/index';

// passport
import { LayoutPassportComponent } from './passport/passport.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
const PASSPORT = [LayoutPassportComponent];

@NgModule({
  imports: [SharedModule, CDKLayoutModule, RouterModule],
  entryComponents: PRO_ENTRYCOMPONENTS,
  declarations: [...PRO_COMPONENTS, ...PASSPORT],
  exports: [...PRO_COMPONENTS, ...PASSPORT],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule {}
