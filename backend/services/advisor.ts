import { cacheClient, dbClient } from "../clients";
import { PoolClient } from "pg";
import { Scraper, dataExtractors } from "./scraper";
import { scraperConfig, mailConfig } from "../configs";
import { DataSources } from "./database";
import Cache from "./cache";
import Mail from "./mail";
import { Offer, Payload } from "../types";
import { logger } from "../utils";

const mail = new Mail(mailConfig);
const scraper = new Scraper(scraperConfig);
const cache = new Cache(cacheClient);

interface BaseContext {
  dbClient: PoolClient;
  dataSources: any;
  logger: any;
}

const initContext = (dataSources: any, context: any): BaseContext => {
  Object.keys(dataSources).forEach((dataSource: string) => {
    dataSources[dataSource].initialize(context);
  });

  return context;
};

const context = initContext(DataSources, {
  dbClient: dbClient,
  dataSources: DataSources,
  logger: logger,
});

let testinsert: boolean = false;

export default {
  start(): void {
    scraper.startPolling((err: Error | undefined, payload: Payload, intevalId?: any) => {
      if (err) {
        intevalId && clearInterval(intevalId);
        return logger.error({ message: err.message, stack: err.stack });
      }

      const { provider, html } = payload;

      if (!dataExtractors[provider]) {
        intevalId && clearInterval(intevalId);
        return logger.error("Missing data extractor for provider: " + provider);
      }

      logger.info("Extracting offers from: " + provider);
      dataExtractors[provider].getOffers(html).forEach(async (offer: Offer) => {
        try {
          const isNewOffer = await cache.set(offer);
          isNewOffer && context.dataSources.offers.insertOne(offer);

          // if (!testinsert) {
          //   context.dataSources.offers.insertOne(offer);
          //   testinsert = !testinsert;
          // }
          isNewOffer && mail.send(offer);
        } catch (error) {
          logger.error({ message: error.message, stack: error.stack });
        }
      });
    });
  },
};
