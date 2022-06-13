import { Component } from '@angular/core';

@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css'],
})
export class LayoutPassportComponent {
  links = [
    {
      title: '帮助',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];
}
