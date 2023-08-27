export interface User {
  email?: string | null;
  name?: string | null;
  nickname?: string | null;
  picture?: string | null;
}

/** Redux */
export enum UserActionType {
  login = 'LOGIN',
  logout = 'LOGOUT',
}

/** Redux */
export type UserAction = {
  type: UserActionType;
  user?: User;
};

/** API */
export interface LoginResponse {
  user: User | null;
}
