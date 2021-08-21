import { ActionMap } from "./Context.model";

export type UserRoot = {
  isLoggedIn: boolean;
};

export type UserLogin = {
  email: string;
  firstname?: string;
  lastname?: string;
  password: string;
  passwordRepeat?: string;
};

export type UserRegister = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordRepeat?: string;
};

export interface User {
  isLoggedIn?: boolean;
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type Token = string;

export enum Types {
  login = "LOGIN",
  register = "REGISTER",
  update = "UPDATE",
  getOne = "GET_ONE",
}

export type UserPayload = {
  [Types.login]: Token;
  [Types.getOne]: User;
  [Types.register]: Token;
  [Types.update]: User;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];
