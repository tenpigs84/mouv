import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAuthority, Authority } from '../authority.model';
import { AuthorityService } from '../service/authority.service';

@Injectable({ providedIn: 'root' })
export class AuthorityRoutingResolveService implements Resolve<IAuthority> {
  constructor(protected service: AuthorityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAuthority> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((authority: HttpResponse<Authority>) => {
          if (authority.body) {
            return of(authority.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Authority());
  }
}
