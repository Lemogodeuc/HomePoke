import ScraperAPI from "./ScraperAPI";
import { BASE_URL } from "../utils/constants";

const API = {
  scraper: new ScraperAPI(BASE_URL),
};

export default API;
