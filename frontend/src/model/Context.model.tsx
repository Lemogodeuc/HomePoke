import { Dispatch } from "react";
import { Offer, OfferActions } from "./Offer.model";
import { Scraper, ScraperActions } from "./Scrap.model";

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
  offers: Offer[];
  scrapers: Scraper[];
};

export type ContextType = {
  state: InitialStateType;
  dispatch: Dispatch<OfferActions | ScraperActions>;
};
