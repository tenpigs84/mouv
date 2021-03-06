import { Component, OnInit } from '@angular/core';
import { Menu, _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sys-role',
  templateUrl: './role.component.html',
})
export class SysRoleComponent implements OnInit {
  private menuEvent!: NzFormatEmitEvent;

  data: NzTreeNode[] = [];
  permission!: NzTreeNode[];
  item: any;
  delDisabled = false;

  constructor(
    private http: _HttpClient,
    private ccSrv: NzContextMenuService,
    private arrSrv: ArrayService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getPermission();
    this.getData();
  }

  private getPermission(): void {
    this.http.get('/permission').subscribe(
      (res: Menu[]) =>
        (this.permission = this.arrSrv.arrToTreeNode(res, {
          titleMapName: 'text',
          cb(item, _parent, deep) {
            item.expanded = deep <= 1;
          },
        }))
    );
  }

  private getData(): void {
    this.http.get('/role').subscribe(
      (res: Menu[]) =>
        (this.data = this.arrSrv.arrToTreeNode(res, {
          titleMapName: 'text',
          cb(item, _parent, deep) {
            item.expanded = deep <= 1;
          },
        }))
    );
  }

  changeData(list: any[]): NzTreeNode[] {
    return this.arrSrv.arrToTreeNode(list || [], {
      titleMapName: 'text',
    });
  }

  add(item: any): void {
    this.closeContextMenu();
    this.item = {
      id: 0,
      text: '',
      parent_id: item ? item.id : 0,
      permission: [],
    };
  }

  edit(): void {
    this.closeContextMenu();
  }

  save(): void {
    const item = this.item;
    item.permission = this.arrSrv.getKeysByTreeNode(this.permission, { includeHalfChecked: false });
    this.http.post('/role', item).subscribe(() => {
      this.item = null;
      if (item.id <= 0) {
        this.getData();
      } else {
        this.menuEvent.node!.title = item.text;
        this.menuEvent.node!.origin = item;
      }
    });
  }

  del(): void {
    this.closeContextMenu();
    this.http.delete(`/role/${this.item.id}`).subscribe(() => {
      this.getData();
      this.item = null;
    });
  }

  get delMsg(): string {
    if (!this.menuEvent) {
      return '';
    }
    const childrenLen = this.menuEvent.node!.children.length;
    if (childrenLen === 0) {
      return `???????????????${this.menuEvent.node!.title}?????????`;
    }
    return `???????????????${this.menuEvent.node!.title}???????????????????????????`;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  move = (e: NzFormatBeforeDropEvent) => {
    if (e.pos !== 0) {
      this.msg.warning(`?????????????????????????????????????????????????????????`);
      return of(false);
    }
    if (e.dragNode.origin.parent_id === e.node.origin.id) {
      return of(false);
    }
    const from = e.dragNode.origin.id;
    const to = e.node.origin.id;
    return this.http
      .post('/role/move', {
        from,
        to,
      })
      .pipe(
        tap(() => (this.item = null)),
        map(() => true)
      );
    // tslint:disable-next-line: semicolon
  };

  show(e: NzFormatEmitEvent): void {
    this.menuEvent = e;
    this.item = e.node!.origin;
  }

  showContextMenu(e: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.menuEvent = e;
    this.delDisabled = e.node!.children.length !== 0;
    this.ccSrv.create(e.event!, menu);
  }

  closeContextMenu(): void {
    this.ccSrv.close();
  }
}
