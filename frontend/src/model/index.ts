import { UserActions } from "./User.model";
import { ScraperActions } from "./Scrap.model";
import { OfferActions } from "./Offer.model";

export type ReducerActions = UserActions | OfferActions | ScraperActions;
