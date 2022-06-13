import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Menu, MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { ViewPermissionService } from 'app/entities/system/view-permission/service/view-permission.service';
import { IViewPermission } from 'app/entities/system/view-permission/view-permission.model';
import { TargetType } from 'app/entities/enumerations/target-type.model';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private viewPermission: ViewPermissionService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    // 处理ViewPermission返回的菜单信息
    if (this.settingService.user) {
      this.viewPermission.tree().subscribe((res: HttpResponse<IViewPermission[]>) => {
        this.menuService.add(this.transformViewPermissionsToMenus(res.body ?? []));
      });
    }
    return new Promise(resolve => {
      zip(
        // this.httpClient.get(`assets/data/i18n/${this.i18n.defaultLang}.json`),
        this.httpClient.get('assets/data/app-data.json')
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([appData]) => {
            resolve(null);
            return [appData];
          })
        )
        .subscribe(
          ([appData]) => {
            // application data
            const res: any = appData;
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // 用户信息：包括姓名、头像、邮箱地址
            // this.settingService.setUser(res.user);
            // ACL：设置权限为全量
            this.aclService.setFull(true);
            // 初始化菜单
            // this.menuService.add(res.menu);
            // 设置页面标题的后缀
            this.titleService.default = '';
            this.titleService.suffix = res.app.name;
          },
          () => {},
          () => {
            resolve(null);
          }
        );
    });
  }
  transformViewPermissionsToMenus(viewPermissions: IViewPermission[]): Menu[] {
    const result: Menu[] = [];
    viewPermissions.forEach(viewPermission => {
      const menu: Menu = {};
      menu.disabled = viewPermission.disabled ?? undefined;
      menu.externalLink = viewPermission.externalLink ?? undefined;
      menu.group = viewPermission.group ?? undefined;
      menu.hide = viewPermission.hide ?? undefined;
      menu.hideInBreadcrumb = viewPermission.hideInBreadcrumb ?? undefined;
      menu.i18n = viewPermission.i18n ?? undefined;
      menu.icon = viewPermission.icon ?? undefined;
      menu.link = viewPermission.link ?? undefined;
      switch (viewPermission.target) {
        case TargetType.BLANK:
          menu.target = '_blank';
          break;
        case TargetType.PARENT:
          menu.target = '_parent';
          break;
        case TargetType.SELF:
          menu.target = '_self';
          break;
        case TargetType.TOP:
          menu.target = '_top';
      }
      menu.text = viewPermission.text ?? undefined;
      menu.shortcut = viewPermission.shortcut ?? undefined;
      menu.shortcutRoot = viewPermission.shortcutRoot ?? undefined;
      menu.reuse = viewPermission.reuse ?? undefined;
      if (viewPermission.children) {
        menu.children = this.transformViewPermissionsToMenus(viewPermission.children);
      }
      result.push(menu);
    });
    return result;
  }
}
