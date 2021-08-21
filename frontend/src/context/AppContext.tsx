import { createContext, useReducer, FC } from "react";
import { offerReducer, scraperReducer, userReducer } from "./";
import { ReducerActions } from "../model";
import { ContextType, InitialStateType, Storage } from "../model/Context.model";

const initialState: InitialStateType = {
  user: { isLoggedIn: false },
  offers: [],
  scrapers: [],
};

const initState = (): InitialStateType => {
  const user: Storage = localStorage.getItem("user");
  const offers: Storage = localStorage.getItem("offers");
  const scrapers: Storage = localStorage.getItem("scrapers");

  const state: InitialStateType = {
    user: user ? JSON.parse(user) : { isLoggedIn: false },
    offers: offers ? JSON.parse(offers) : [],
    scrapers: scrapers ? JSON.parse(scrapers) : [],
  };

  return state;
};

const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ user, offers, scrapers }: InitialStateType, action: ReducerActions) => ({
  user: userReducer(user, action),
  offers: offerReducer(offers, action),
  scrapers: scraperReducer(scrapers, action),
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState, initState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
