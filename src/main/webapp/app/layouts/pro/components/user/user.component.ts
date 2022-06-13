import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
// import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'layout-pro-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProWidgetUserComponent implements OnInit {
  account: Account | null | undefined;
  constructor(
    public settings: SettingsService,
    private router: Router,
    // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private loginService: LoginService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // mock
    /* const token = this.tokenService.get() || {
      token: 'nothing',
      name: 'Admin',
      avatar: '/assets/logo-color.svg',
      email: 'cipchk@qq.com',
    }; */
    this.accountService.identity().subscribe(account => (this.account = account));
    // this.tokenService.set(token);
  }

  logout(): void {
    this.loginService.logout();
    // this.tokenService.clear();
    // this.router.navigateByUrl(this.tokenService.login_url);
  }
}
