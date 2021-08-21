import { useContext } from "react";
import { AppContext } from "../context";

// types
import { Scraper, ScrapFormValues, Types } from "../model/Scrap.model";

// API
import API from "../data";

type TScrapers = {
  getAllScrapers: Function;
  createScraper: Function;
  updateScraper: Function;
  toogleScraper: Function;
  deleteScraper: Function;
};

const useScrapers = (): TScrapers => {
  const { dispatch } = useContext(AppContext);

  const getAllScrapers = async (userId: number = 1) => {
    try {
      const data: Scraper[] = await API.scraper.getAllByUserId(userId);
      data && dispatch({ type: Types.store, payload: data });
    } catch (error) {
      console.log("[getAllScrapers] ", error);
    }
  };

  const createScraper = async (formData: ScrapFormValues) => {
    try {
      const data: Scraper = await API.scraper.createOne(formData);
      data && dispatch({ type: Types.create, payload: data });
    } catch (error) {
      console.log("[getAllScrapers] ", error);
    }
  };

  const updateScraper = async (formData: ScrapFormValues) => {
    try {
      const payload = await API.scraper.updateOne(formData);
      payload && dispatch({ type: Types.update, payload });
    } catch (error) {
      console.log("[updateOffer] ", error);
    }
  };

  const toogleScraper = async (id: number, value: boolean) => {
    try {
      const result = await API.scraper.toggleOne(id, value);
      result && dispatch({ type: Types.toggle, payload: id });
    } catch (error) {
      console.log("[toogleScraper] ", error);
    }
  };

  const deleteScraper = async (id: number) => {
    try {
      const result = await API.scraper.deleteOne(id);
      result && dispatch({ type: Types.delete, payload: id });
    } catch (error) {
      console.log("[deleteScraper] ", error);
    }
  };

  return { getAllScrapers, createScraper, updateScraper, toogleScraper, deleteScraper };
};

export default useScrapers;
