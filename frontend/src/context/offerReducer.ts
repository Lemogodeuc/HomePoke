import { Offer, Types } from "../model/Offer.model";
import { ReducerActions } from "../model";
import { getIndex, storeState } from "./helpers";

export const offerReducer = (state: Offer[], action: ReducerActions) => {
  let offerIndex: number;

  switch (action.type) {
    case Types.store:
      return storeState("offers", action.payload);

    case Types.favorite:
      offerIndex = getIndex(action.payload.id, state);
      if (offerIndex !== -1) {
        state[offerIndex].isFavorite = action.payload.value;
      }

      return offerIndex !== -1 ? storeState("offers", state) : state;

    case Types.contacted:
      offerIndex = getIndex(action.payload.id, state);
      if (offerIndex !== -1) {
        state[offerIndex].isContacted = action.payload.value;
      }

      return offerIndex !== -1 ? storeState("offers", state) : state;

    case Types.delete:
      offerIndex = getIndex(action.payload.id, state);
      if (offerIndex !== -1) {
        state[offerIndex].isDelete = action.payload.value;
      }

      return offerIndex !== -1 ? storeState("offers", state) : state;

    default:
      return state;
  }
};
