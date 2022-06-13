import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';

// alain------start
// #region your componets & directives
import { PRO_SHARED_MODULES } from '../layouts/pro';
import { AddressModule } from './components/address';
import { DelayModule } from './components/delay';
import { EditorModule } from './components/editor';
import { FileManagerModule } from './components/file-manager';
import { MasonryModule } from './components/masonry';
import { MouseFocusModule } from './components/mouse-focus';
import { ScrollbarModule } from './components/scrollbar';
import { StatusLabelModule } from './components/status-label';

import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';
import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
// #region third libs
import { DragDropModule } from '@angular/cdk/drag-drop';

const THIRDMODULES = [DragDropModule];
// #endregion
// alain------end

const MODULES = [
  AddressModule,
  DelayModule,
  EditorModule,
  FileManagerModule,
  MasonryModule,
  MouseFocusModule,
  ScrollbarModule,
  StatusLabelModule,
  ...PRO_SHARED_MODULES,
];
@NgModule({
  imports: [
    SharedLibsModule,
    AlainThemeModule.forChild(),
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    ...MODULES,
    ...THIRDMODULES,
  ],
  declarations: [
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
  ],
  exports: [
    SharedLibsModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    ...MODULES,
    // third libs
    ...THIRDMODULES,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
  ],
})
export class SharedModule {}
