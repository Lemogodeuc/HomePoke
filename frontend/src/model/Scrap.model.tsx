export default interface Scrap {
  status: string;
  provider: string;
  title: string;
  error: string | number | null;
  severity: number;
  pollInterval: number;
}
