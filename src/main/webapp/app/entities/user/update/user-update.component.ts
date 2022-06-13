import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// import * as moment from 'moment';
// import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

import { IUser } from '../user.model';
import { UserService } from '../service/user.service';
import { IDepartment } from 'app/entities/settings/department/department.model';
import { DepartmentService } from 'app/entities/settings/department/service/department.service';
import { toNzTreeNode, toNzTreeNodeKeyId } from 'app/shared/util/tree-util';

@Component({
  selector: 'jhi-user-update',
  templateUrl: './user-update.component.html',
  styles: [
    `
      .ant-form-item {
        width: 44%;
      }
    `,
  ],
})
export class UserUpdateComponent implements OnInit {
  user: IUser | null = null;
  isSaving = false;

  departmentsNzTreeNodes: any[] = [];

  departments: IDepartment[] = [];

  constructor(
    protected eventManager: EventManager,
    protected userService: UserService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ user }) => {
      this.user = user;

      // this.birthday = this.user.birthday != null ? this.user.birthday.format(DATE_TIME_FORMAT) : null;
      // this.resetDate = this.user.resetDate != null ? this.user.resetDate.format(DATE_TIME_FORMAT) : null;
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe(
        (res: IDepartment[] | null) => {
          this.departments = res!;
          // add by wang xin
          this.departmentsNzTreeNodes = toNzTreeNodeKeyId(this.departments, this.user?.department?.id, 'name');
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    // this.user.birthday = this.birthday != null ? moment(this.birthday, DATE_TIME_FORMAT) : null;
    // this.user.resetDate = this.resetDate != null ? moment(this.resetDate, DATE_TIME_FORMAT) : null;
    if (this.user?.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.update(this.user!));
    } else {
      this.subscribeToSaveResponse(this.userService.create(this.user!));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      (res: HttpResponse<IUser>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  protected onError(errorMessage: string): void {
    // this.jhiAlertService.error(errorMessage, null, null);
    console.log('error', errorMessage);
  }

  trackDepartmentById(index: number, item: IDepartment): number {
    return item.id!;
  }
}
