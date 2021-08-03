import UserDataSource from "./userDataSource";
import OfferDataSource from "./offerDataSource";
import ScraperDataSource from "./scraperDataSource";

export const DataSources = {
  users: new UserDataSource(),
  offers: new OfferDataSource(),
  scrapers: new ScraperDataSource(),
};
