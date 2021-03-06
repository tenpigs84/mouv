import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardDDService } from './dd.service';
import { DDWidget } from './dd.types';
import { DashboardDDSettingsComponent } from './settings/settings.component';
import { DashboardDDContainerComponent } from './widgets/container.component';

@Component({
  selector: 'app-dd',
  templateUrl: './dd.component.html',
  host: {
    '[class.app-dd]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDDComponent implements AfterViewInit, OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild(CdkDropList, { static: true }) private placeholder!: CdkDropList;
  @ViewChildren(DashboardDDContainerComponent) private containers!: QueryList<DashboardDDContainerComponent>;
  private target: CdkDropList | null = null;
  private targetIndex!: number;
  private source: NzSafeAny = null;
  private sourceIndex!: number;

  widgets: DDWidget[] = [];
  design = false;

  constructor(private srv: DashboardDDService, private modal: ModalHelper, private msg: NzMessageService, private cdr: ChangeDetectorRef) {}

  drop(): void {
    if (!this.target) {
      return;
    }

    const phEl = this.placeholder.element.nativeElement;
    const parent = phEl.parentNode!;

    phEl.style.display = 'none';

    parent.removeChild(phEl);
    parent.appendChild(phEl);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

    this.target = null;
    this.source = null;

    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.widgets, this.sourceIndex, this.targetIndex);
    }
  }

  enterPredicate = (drag: CdkDrag, drop: CdkDropList): boolean => {
    if (drop === this.placeholder) {
      return true;
    }

    const phEl = this.placeholder.element.nativeElement;
    const dropEl = drop.element.nativeElement;

    let dragIndex = Array.prototype.indexOf.call(dropEl.parentNode?.children, drag.dropContainer.element.nativeElement);
    if (dragIndex === -1) {
      dragIndex = Array.prototype.indexOf.call(dropEl.parentNode?.children, phEl);
    }
    const dropIndex = Array.prototype.indexOf.call(dropEl.parentNode?.children, dropEl);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      const sourceEl = this.source.element.nativeElement;
      phEl.removeAttribute('class');
      phEl.classList.add('app-dd__ph');
      sourceEl.classList.forEach((cls: string) => {
        if (cls.startsWith('ant-')) {
          phEl.classList.add(cls);
        }
      });
      phEl.style.width = `${sourceEl.clientWidth}px`;
      phEl.style.height = `${sourceEl.clientHeight}px`;
      phEl.style.paddingLeft = sourceEl.style.paddingLeft;
      phEl.style.paddingRight = sourceEl.style.paddingRight;

      sourceEl.parentNode.removeChild(sourceEl);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phEl.style.display = '';
    dropEl.parentNode?.insertBefore(phEl, dragIndex < dropIndex ? dropEl.nextSibling : dropEl);

    this.source.start();
    this.placeholder._dropListRef.enter(drag._dragRef, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);

    return false;
    // tslint:disable-next-line: semicolon
  };

  showSettings(): void {
    this.modal.createStatic(DashboardDDSettingsComponent).subscribe(res => {
      this.widgets = res;
      this.cdr.detectChanges();
    });
  }

  refresh(): void {
    this.containers.forEach(comp => comp.refresh());
  }

  saveDesign(): void {
    this.srv.save.subscribe(() => {
      this.msg.success('Save Success');
      this.design = false;
      this.cdr.detectChanges();
      this.refresh();
    });
  }

  ngAfterViewInit(): void {
    const phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentNode?.removeChild(phElement);
  }

  ngOnInit(): void {
    this.srv.widgets.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.widgets = res;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
