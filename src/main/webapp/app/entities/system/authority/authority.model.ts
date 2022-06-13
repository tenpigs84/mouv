import { IUser } from 'app/entities/user/user.model';
import { IViewPermission } from 'app/entities/system/view-permission/view-permission.model';

export interface IAuthority {
  id?: number;
  name?: string;
  code?: string;
  info?: string;
  order?: number;
  display?: boolean;
  children?: IAuthority[];
  users?: IUser[];
  viewPermissions?: IViewPermission[];
  parent?: IAuthority | null;
  expand?: boolean;
  nzAddLevel?: number;
}

export class Authority implements IAuthority {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public info?: string,
    public order?: number,
    public display?: boolean,
    public children?: IAuthority[],
    public users?: IUser[],
    public viewPermissions?: IViewPermission[],
    public parent?: IAuthority | null,
    public expand?: boolean,
    public nzAddLevel?: number
  ) {
    this.display = this.display ?? false;
  }
}

export function getAuthorityIdentifier(authoriy: IAuthority): number | undefined {
  return authoriy.id;
}
