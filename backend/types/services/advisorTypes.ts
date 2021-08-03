export interface LaucherConfig {
  fetcher: any;
  dataExtractors: any;
  cache: any;
  mailer: any;
}

export interface Payload {
  provider: string;
  html: string;
}
