export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  imageUrl?: string;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: any[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public imageUrl?: string
  ) {
    this.id = id ? id : null;
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.activated = activated;
    this.langKey = langKey;
    this.authorities = authorities;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModifiedDate = lastModifiedDate;
    this.password = password;
    this.imageUrl = imageUrl;
  }
}
