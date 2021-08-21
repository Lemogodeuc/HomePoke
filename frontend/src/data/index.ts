import ScraperAPI from "./ScraperAPI";
import OfferAPI from "./OfferAPI";
import UserAPI from "./UserAPI";
import { BASE_URL } from "../utils/constants";

const API = {
  scraper: new ScraperAPI(BASE_URL),
  offer: new OfferAPI(BASE_URL),
  user: new UserAPI(BASE_URL),
};

export default API;
