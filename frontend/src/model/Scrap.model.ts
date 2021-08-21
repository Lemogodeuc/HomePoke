import { ActionMap } from "./Context.model";

export interface Scraper {
  id: number;
  userId: number;
  title: string;
  active: boolean;
  status: string;
  pollInterval: number;
  url: string;
  lastError: string | null;
  providerId: number;
  requestHeaderId: number | null;
  createdAt: string;
  updatedAt: string;
}
export interface ScrapFormValues {
  id?: string | number | null;
  title: string;
  active?: boolean;
  status?: string;
  frequency: number;
  pollInterval?: number;
  url: string;
  provider: string;
}
export interface Scrap {
  id?: string | number | null;
  title: string;
  active: boolean;
  status: string;
  frequency: number;
  severity?: number;
  pollInterval: number;
  lastError: string | number;
  url: string;
  provider: {
    name: string;
    host: string;
  };
}

export enum Types {
  store = "STORE",
  create = "CREATE",
  update = "UPDATE",
  toggle = "TOGGLE",
  delete = "DELETE",
}

export type ScraperPayload = {
  [Types.store]: Scraper[];
  [Types.create]: Scraper;
  [Types.update]: Scraper;
  [Types.toggle]: number;
  [Types.delete]: number;
};

export type ScraperActions = ActionMap<ScraperPayload>[keyof ActionMap<ScraperPayload>];
