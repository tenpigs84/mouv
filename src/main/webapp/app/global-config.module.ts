import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '@core';
import { AlainThemeModule } from '@delon/theme';
import { AlainConfig, ALAIN_CONFIG } from '@delon/util';

// Please refer to: https://ng-alain.com/docs/global-config
// #region NG-ALAIN Config

import { DelonACLModule } from '@delon/acl';

const alainConfig: AlainConfig = {
  st: { modal: { size: 'lg' } },
  pageHeader: { homeI18n: 'home', recursiveBreadcrumb: true },
  auth: { login_url: '/passport/login' },
};

const alainModules = [AlainThemeModule.forRoot(), DelonACLModule.forRoot()];
const alainProvides = [{ provide: ALAIN_CONFIG, useValue: alainConfig }];

// #region reuse-tab

import { RouteReuseStrategy } from '@angular/router';
import { ReuseTabMatchMode, ReuseTabService, ReuseTabStrategy } from '@delon/abc/reuse-tab';
alainProvides.push({
  provide: RouteReuseStrategy,
  useClass: ReuseTabStrategy,
  deps: [ReuseTabService],
} as any);

// #endregion

// #endregion

// Please refer to: https://ng.ant.design/docs/global-config/en#how-to-use
// #region NG-ZORRO Config

import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {};

const zorroProvides = [{ provide: NZ_CONFIG, useValue: ngZorroConfig }];

// #endregion

// #region AUTH_DEFAULT_CONFIG Config
import { AUTH_DEFAULT_CONFIG } from '@delon/auth';
const authConfig = AUTH_DEFAULT_CONFIG;
authConfig.token_send_template = 'Bearer ${token}';
authConfig.token_send_key = 'Authorization';
authConfig.ignores = [/\/login/, /assets\//, /i18n\//, /api\/authenticate/, /api\/authenticate\/mobile/];
const authProvides = [{ provide: AUTH_DEFAULT_CONFIG, useValue: authConfig }];
// #endregion

@NgModule({
  imports: [...alainModules],
})
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule, reuseTabService: ReuseTabService) {
    throwIfAlreadyLoaded(parentModule, 'GlobalConfigModule');
    // NOTICE: Only valid for menus with reuse property
    // Pls refer to the E-Mail demo effect
    reuseTabService.mode = ReuseTabMatchMode.MenuForce;
    // Shouled be trigger init, you can ingore when used `reuse-tab` component in layout component
    reuseTabService.init();
  }

  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [...alainProvides, ...zorroProvides, ...authProvides],
    };
  }
}
