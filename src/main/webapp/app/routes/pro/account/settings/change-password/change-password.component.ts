import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';
import { PasswordService } from 'app/account/password/password.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'jhi-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  doNotMatch: string;
  error: string;
  success: string;
  account: any;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(private passwordService: PasswordService, private accountService: AccountService, private message: NzMessageService) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.account = account;
    });
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = null;
      this.success = null;
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.passwordService.save(this.newPassword, this.currentPassword).subscribe(
        () => {
          this.error = null;
          this.success = 'OK';
          this.message.success('密码更新成功！');
        },
        () => {
          this.success = null;
          this.error = 'ERROR';
          this.message.error('密码更新失败！');
        }
      );
    }
  }
}
