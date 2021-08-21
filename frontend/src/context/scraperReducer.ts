import { Scraper, Types } from "../model/Scrap.model";
import { ReducerActions } from "../model";

import { getIndex, storeState } from "./helpers";

export const scraperReducer = (state: Scraper[], action: ReducerActions) => {
  let scraperIndex: number;

  switch (action.type) {
    case Types.store:
      return storeState("scrapers", action.payload);

    case Types.create:
      const scrapers: Scraper[] = [...state];
      scrapers.unshift(action.payload);

      return storeState("scrapers", scrapers);

    case Types.toggle:
      scraperIndex = getIndex(action.payload, state);
      if (scraperIndex !== -1) {
        state[scraperIndex].active = !state[scraperIndex].active;
      }

      return scraperIndex !== -1 ? storeState("scrapers", state) : state;

    case Types.update:
      scraperIndex = getIndex(action.payload.id, state);
      if (scraperIndex !== -1) {
        state[scraperIndex] = action.payload;
      }

      return scraperIndex !== -1 ? storeState("scrapers", state) : state;

    case Types.delete:
      scraperIndex = getIndex(action.payload, state);
      if (scraperIndex !== -1) {
        delete state[scraperIndex];
      }

      return scraperIndex !== -1 ? storeState("scrapers", state) : state;

    default:
      return state;
  }
};
