import { Dispatch } from "react";
import { UserRoot } from "./User.model";
import { Offer } from "./Offer.model";
import { Scraper } from "./Scrap.model";
import { ReducerActions } from "../model";

export type Storage = string | null;

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type InitialStateType = {
  user: UserRoot;
  offers: Offer[];
  scrapers: Scraper[];
};

export type ContextType = {
  state: InitialStateType;
  dispatch: Dispatch<ReducerActions>;
};
