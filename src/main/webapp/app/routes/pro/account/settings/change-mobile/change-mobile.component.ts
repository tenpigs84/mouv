import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { PasswordService } from 'app/account/password/password.service';

@Component({
  selector: 'jhi-password',
  templateUrl: './change-mobile.component.html',
  styles: [
    `
      .login {
        width: 100%;
        background-color: #fff;
      }
      .login__wrap {
        position: relative;
        margin: 24px;
      }
      .login__title {
        font-size: 18px;
        font-weight: 400;
      }
      .mobile-code {
        width: 60% !important;
      }
      .mobile-login-button {
        width: 30% !important;
        margin-left: 2%;
      }
    `,
  ],
})
export class ChangeMobileComponent implements OnInit {
  timer; // 定时器
  smsSecond = 60; // 60秒
  smsBtnDisable = false;
  smsBtnTitle = '发送验证码';
  mobile: string;
  smsCode: string;
  imageCode: string;
  captcha: string;
  doNotMatch: string;
  error: string;
  success: string;
  account: any;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  loading = false;

  constructor(private passwordService: PasswordService, private accountService: AccountService, private loginService: LoginService) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.account = account;
    });
  }

  sendSmsCode() {
    this.error = '';
    if (!this.mobile) {
      this.error = '请输入手机号码。';
      return;
    }
    if (this.captcha) {
      if (!this.imageCode) {
        this.error = '请输入图形验证码';
        return;
      }
    }
    this.loginService.sendCurrentUserSmsCode(this.mobile, this.imageCode).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.body && res.body.data) {
          this.captcha = res.body.data;
        }
        // todo 到计时
        this.timer = setInterval(() => {
          // 设置定时刷新事件，每隔1秒刷新
          if (!this.smsBtnDisable) {
            this.smsBtnDisable = true;
          }
          this.smsBtnTitle = this.smsSecond + '秒';
          this.smsSecond = this.smsSecond - 1;
          if (this.smsSecond === 0) {
            clearInterval(this.timer);
            this.smsSecond = 60;
            this.smsBtnTitle = '发送验证码';
            this.smsBtnDisable = false;
          }
        }, 1000);
      } else {
        this.error = '发送手机短信验证码失败。';
      }
    });
  }

  changeMobile() {
    this.error = '';
    if (!this.mobile) {
      this.error = '请输入手机号码';
      return;
    }
    if (!this.smsCode) {
      this.error = '请输入手机验证码';
      return;
    }
    if (this.captcha) {
      if (!this.imageCode) {
        this.error = '请输入图形验证码';
        return;
      }
    }
    this.loginService.saveMobile(this.mobile, this.smsCode, this.imageCode).subscribe((res: any) => {
      if (res.status === 200) {
        this.error = '保存成功';
      } else {
        this.error = '验证失败，未保存手机号码';
      }
    });
  }
}
