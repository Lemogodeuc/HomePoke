import { Offer, OfferActions, Types } from "../model/Offer.model";
import { ScraperActions } from "../model/Scrap.model";

export const offerReducer = (state: Offer[], action: OfferActions | ScraperActions) => {
  const getIndex = (id: number, offers: Offer[]): number => {
    return offers.findIndex((offer: Offer) => offer.id === id);
  };

  const storeOffers = (payload: Offer[]) => {
    localStorage.setItem("offers", JSON.stringify(payload));
    return payload;
  };

  let offerIndex: number;

  switch (action.type) {
    case Types.store:
      return storeOffers(action.payload);

    case Types.favorite:
      offerIndex = getIndex(<number>action.payload.id, state);
      if (offerIndex !== -1) {
        state[offerIndex].isFavorite = action.payload.value;
      }

      return offerIndex !== -1 ? storeOffers(state) : state;

    case Types.contacted:
      offerIndex = getIndex(<number>action.payload.id, state);
      if (offerIndex !== -1) {
        state[offerIndex].isContacted = action.payload.value;
      }

      return offerIndex !== -1 ? storeOffers(state) : state;

    case Types.delete:
      offerIndex = getIndex(<number>action.payload.id, state);
      if (offerIndex !== -1) {
        state[offerIndex].isDelete = action.payload.value;
      }

      return offerIndex !== -1 ? storeOffers(state) : state;

    default:
      return state;
  }
};
