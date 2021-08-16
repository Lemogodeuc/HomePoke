import { createContext, useReducer, FC } from "react";
import { offerReducer, scraperReducer } from "./";
import { ContextType, InitialStateType } from "../model/Context.model";
import { OfferActions } from "../model/Offer.model";
import { ScraperActions } from "../model/Scrap.model";

const initialState: InitialStateType = { offers: [], scrapers: [] };

const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ offers, scrapers }: InitialStateType, action: OfferActions | ScraperActions) => ({
  offers: offerReducer(offers, action),
  scrapers: scraperReducer(scrapers, action),
});

const initState = (): InitialStateType => {
  const offers: string | null = localStorage.getItem("offers");
  const scrapers: string | null = localStorage.getItem("scrapers");

  const state: InitialStateType = {
    offers: offers ? JSON.parse(offers) : [],
    scrapers: scrapers ? JSON.parse(scrapers) : [],
  };

  return state;
};

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState, initState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
