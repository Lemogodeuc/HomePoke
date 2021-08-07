export interface ScrapRequest {
  id?: string | number | null;
  title: string;
  active?: string;
  status?: string;
  frequency: number;
  pollInterval?: number;
  url: string;
  provider: string;
}
