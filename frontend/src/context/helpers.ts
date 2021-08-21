import { Offer } from "../model/Offer.model";
import { Scraper } from "../model/Scrap.model";

type Key = "user" | "offers" | "scrapers" | "token";

export const getIndex = (id: number, state: Offer[] | Scraper[]): number => {
  return state.findIndex((target: Offer | Scraper) => target.id === id);
};

export const storeState = (key: Key, state: any): any => {
  localStorage.setItem(key, JSON.stringify(state));
  return state;
};
