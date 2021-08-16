import { useContext } from "react";
import { AppContext } from "../context";
import { Offer, Types } from "../model/Offer.model";
import API from "../data";

type Actions = "favorite" | "contacted" | "delete";

const useOffers = () => {
  const { dispatch } = useContext(AppContext);

  const getAllOffers = async (userId: number = 1) => {
    try {
      const data: Offer[] = await API.offer.getAllByUserId(userId);
      dispatch({ type: Types.store, payload: data });
    } catch (error) {
      console.log("[getAllOffers] ", error);
    }
  };

  const updateOffer = async (id: number, action: Actions, value: boolean) => {
    try {
      await API.offer.updateOne(id, action, value);
      dispatch({ type: Types[action], payload: { id, value } });
    } catch (error) {
      console.log("[updateOffer] ", error);
    }
  };

  return { updateOffer, getAllOffers };
};

export default useOffers;
