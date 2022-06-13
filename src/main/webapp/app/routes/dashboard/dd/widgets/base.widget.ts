import { ChangeDetectorRef, Directive, Inject, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardDDContainerComponent } from './container.component';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class DDBaseWidget {
  @Input() params?: any;

  abstract load(): Promise<void>;

  constructor(
    @Inject(_HttpClient) protected readonly http: _HttpClient,
    @Inject(ChangeDetectorRef) protected readonly cdr: ChangeDetectorRef,
    @Inject(DashboardDDContainerComponent)
    protected readonly containerComp: DashboardDDContainerComponent,
    @Inject(NzMessageService) public readonly msg: NzMessageService
  ) {}
}
