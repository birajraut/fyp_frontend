import { IUserResponse } from './user';

export type ILoginAs = 'RESTAURANT' | 'USER' | 'ADMIN';
export interface IRestaurant {
  id: string;
  name: string;
}
export interface IAuth {
  accessToken: string | null;
  refreshToken: string | null;
  user: IUserResponse | null;
  loginAs: ILoginAs | null;
  restaurant: IRestaurant;
}

export interface IRootReducer {
  auth: IAuth;
}
