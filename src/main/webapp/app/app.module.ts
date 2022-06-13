import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/zh-Hans';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import * as dayjs from 'dayjs';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConfigModule } from './global-config.module';
import { LayoutModule } from 'app/layouts/layouts.module';
import { JsonSchemaModule } from '@shared';
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../_mock';
const FORM_MODULES = [JsonSchemaModule];

// #region Http Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SimpleInterceptor } from '@delon/auth';
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];
// #endregion

import { SERVER_API_URL } from './app.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { default as ngLang } from '@angular/common/locales/zh';
import { ALAIN_I18N_TOKEN, DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
import { zhCN as dateLang } from 'date-fns/locale';
import { NZ_DATE_LOCALE, NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd/i18n';
const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang,
};
// #region Startup Service
import { StartupService } from './core/startup/startup.service';
export function StartupServiceFactory(startupService: StartupService): () => Promise<void> {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { MainComponent } from './layouts/main/main.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
import { I18NService } from 'app/core/i18n/i18n.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { DefaultInterceptor } from 'app/core/net/default.interceptor';

const I18NSERVICE_PROVIDES = [{ provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    // EntityRoutingModule,
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    LayoutModule,
    ...FORM_MODULES,
    RouterModule,
    NzNotificationModule,
    DelonMockModule.forRoot({ data: MOCKDATA }),
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    ...APPINIT_PROVIDES,
    ...I18NSERVICE_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
  ],
  declarations: [MainComponent, ErrorComponent, PageRibbonComponent],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    registerLocaleData(LANG.ng, LANG.abbr);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
