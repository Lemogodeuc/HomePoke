import { ActionMap } from "../model/Context.model";
export interface Offer {
  id: number;
  active: boolean;
  title: string;
  excerpt: string;
  description: string;
  ownerName: string;
  ownerType: string;
  url: string;
  city: string;
  cityCode: number;
  location: string;
  imageUrls: string | Array<string> | null;
  price: number | null;
  includingCharges: boolean | null;
  type: string | null;
  furnished: boolean | null;
  surface: number | null;
  rooms: number | null;
  energy: string | null;
  ges: string | null;
  publicationDate: string | null;
  isFavorite: boolean;
  isContacted: boolean;
  isDelete: boolean;
  userId: number | null;
  assets: string | null;
}

export enum Types {
  store = "STORE_OFFERS",
  favorite = "UPDATE_FAVORITE",
  contacted = "UPDATE_CONTACTED",
  delete = "UPDATE_DELETE",
}

export type OfferPayload = {
  [Types.store]: Offer[];
  [Types.favorite]: { id: number; value: boolean };
  [Types.contacted]: { id: number; value: boolean };
  [Types.delete]: { id: number; value: boolean };
};

export type OfferActions = ActionMap<OfferPayload>[keyof ActionMap<OfferPayload>];
