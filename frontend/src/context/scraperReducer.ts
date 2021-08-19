import { Scraper, ScraperActions, Types } from "../model/Scrap.model";
import { OfferActions } from "../model/Offer.model";

export const scraperReducer = (state: Scraper[], action: ScraperActions | OfferActions) => {
  const store = (payload: Scraper[]) => {
    localStorage.setItem("scrapers", JSON.stringify(payload));
    return payload;
  };

  const getIndex = (scraperId: number, scrapers: Scraper[]): number => {
    return scrapers.findIndex((scraper: Scraper) => scraper.id === scraperId);
  };

  let scraperIndex: number;

  switch (action.type) {
    case Types.store:
      return store(action.payload);

    case Types.create:
      const scrapers: Scraper[] = [...state];
      scrapers.unshift(action.payload);
      return store(scrapers);

    case Types.toggle:
      scraperIndex = getIndex(action.payload, state);
      console.log("[scraperIndex] ", scraperIndex);
      if (scraperIndex !== -1) {
        state[scraperIndex].active = !state[scraperIndex].active;
      }
      return scraperIndex !== -1 ? store(state) : state;

    case Types.update:
      scraperIndex = getIndex(action.payload.id, state);
      if (scraperIndex !== -1) {
        state[scraperIndex] = action.payload;
      }

      return scraperIndex !== -1 ? store(state) : state;

    case Types.delete:
      scraperIndex = getIndex(action.payload, state);
      if (scraperIndex !== -1) {
        delete state[scraperIndex];
      }

      return scraperIndex !== -1 ? store(state) : state;

    default:
      return state;
  }
};
