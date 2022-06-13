import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUser, getUserIdentifier } from '../user.model';

export type EntityResponseType = HttpResponse<IUser>;
export type EntityArrayResponseType = HttpResponse<IUser[]>;

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/users');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(user: IUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(user);
    return this.http
      .post<IUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(user: IUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(user);
    return this.http
      .put<IUser>(`${this.resourceUrl}/${getUserIdentifier(user) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateBySpecifiedFields(user: IUser, specifiedFields: string[]): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(user);
    const copy = user;
    return this.http
      .put<IUser>(this.resourceUrl + '/specified-fields', { user: copy, specifiedFields }, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
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

  addUserToCollectionIfMissing(userCollection: IUser[], ...usersToCheck: (IUser | null | undefined)[]): IUser[] {
    const users: IUser[] = usersToCheck.filter(isPresent);
    if (users.length > 0) {
      const userCollectionIdentifiers = userCollection.map(userItem => getUserIdentifier(userItem)!);
      const usersToAdd = users.filter(userItem => {
        const userIdentifier = getUserIdentifier(userItem);
        if (userIdentifier == null || userCollectionIdentifiers.includes(userIdentifier)) {
          return false;
        }
        userCollectionIdentifiers.push(userIdentifier);
        return true;
      });
      return [...usersToAdd, ...userCollection];
    }
    return userCollection;
  }

  protected convertDateFromClient(user: IUser): IUser {
    return Object.assign({}, user, {
      birthday: user.birthday?.isValid() ? user.birthday.toJSON() : undefined,
      resetDate: user.resetDate?.isValid() ? user.resetDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthday = res.body.birthday ? dayjs(res.body.birthday) : undefined;
      res.body.resetDate = res.body.resetDate ? dayjs(res.body.resetDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((user: IUser) => {
        user.birthday = user.birthday ? dayjs(user.birthday) : undefined;
        user.resetDate = user.resetDate ? dayjs(user.resetDate) : undefined;
      });
    }
    return res;
  }
}
