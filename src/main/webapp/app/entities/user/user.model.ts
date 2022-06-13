export interface IUser {
  id?: string;
  login?: string;
  firstName?: string;
  imageUrl?: string;
}

export class User implements IUser {
  constructor(public id: string, public login: string, public firstName: string, public imageUrl: string) {}
}

export function getUserIdentifier(user: IUser): string | undefined {
  return user.id;
}
