import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonTable, ICommonTable } from 'app/entities/modelConfig/common-table/common-table.model';
import { CommonTableService } from 'app/entities/modelConfig/common-table/service/common-table.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommonTableDataResolve implements Resolve<CommonTable[] | null> {
  constructor(private service: CommonTableService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CommonTable[] | null> {
    return this.service.query({ 'entityName.equals': route.data.entityClassName }).pipe(
      filter((mayBeOk: HttpResponse<ICommonTable[]>) => mayBeOk.ok),
      map((response: HttpResponse<ICommonTable[]>) => response.body)
    );
  }
}
