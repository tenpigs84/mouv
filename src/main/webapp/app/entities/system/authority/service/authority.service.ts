import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAuthority, getAuthorityIdentifier } from '../authority.model';

export type EntityResponseType = HttpResponse<IAuthority>;
export type EntityArrayResponseType = HttpResponse<IAuthority[]>;

@Injectable({ providedIn: 'root' })
export class AuthorityService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/api-permissions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(authority: IAuthority): Observable<EntityResponseType> {
    return this.http.post<IAuthority>(this.resourceUrl, authority, { observe: 'response' });
  }

  update(authority: IAuthority): Observable<EntityResponseType> {
    return this.http.put<IAuthority>(`${this.resourceUrl}/${getAuthorityIdentifier(authority) as number}`, authority, {
      observe: 'response',
    });
  }

  updateBySpecifiedFields(authority: IAuthority, specifiedFields: string[]): Observable<EntityResponseType> {
    return this.http.put<IAuthority>(this.resourceUrl + '/specified-fields', { authority, specifiedFields }, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAuthority>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAuthority[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  tree(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAuthority[]>(this.resourceUrl + '/tree', { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  deleteByIds(ids: number[]): Observable<HttpResponse<any>> {
    let options: HttpParams = new HttpParams();
    ids.forEach(id => {
      options = options.append('ids', String(id));
    });
    return this.http.delete<any>(`${this.resourceUrl}`, { params: options, observe: 'response' });
  }

  addAuthorityToCollectionIfMissing(
    apiPermissionCollection: IAuthority[],
    ...apiPermissionsToCheck: (IAuthority | null | undefined)[]
  ): IAuthority[] {
    const apiPermissions: IAuthority[] = apiPermissionsToCheck.filter(isPresent);
    if (apiPermissions.length > 0) {
      const apiPermissionCollectionIdentifiers = apiPermissionCollection.map(
        apiPermissionItem => getAuthorityIdentifier(apiPermissionItem)!
      );
      const apiPermissionsToAdd = apiPermissions.filter(apiPermissionItem => {
        const apiPermissionIdentifier = getAuthorityIdentifier(apiPermissionItem);
        if (apiPermissionIdentifier == null || apiPermissionCollectionIdentifiers.includes(apiPermissionIdentifier)) {
          return false;
        }
        apiPermissionCollectionIdentifiers.push(apiPermissionIdentifier);
        return true;
      });
      return [...apiPermissionsToAdd, ...apiPermissionCollection];
    }
    return apiPermissionCollection;
  }
}
