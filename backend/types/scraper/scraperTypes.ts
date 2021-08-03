export interface UrlTarget {
  active: boolean;
  pollInterval: number,
  fetchOnlyOnce: boolean,
  url: string
  options?: {
    headers: any
  }
}