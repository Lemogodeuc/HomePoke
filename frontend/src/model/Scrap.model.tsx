interface Provider {
  name: string;
  host: string;
}
export interface ScrapFormValues {
  id?: string | number | null;
  title: string;
  active?: string;
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
