import { RedisClient } from "redis";
import crypto from "crypto";
import { Offer } from "../../types";
import { logger } from "../../utils";

export default class Cache {
  private client: RedisClient;
  private prefix: string;

  constructor(client: RedisClient) {
    this.client = client;
    this.prefix = "offer_key_";
  }

  private buildKey(offer: Offer) {
    const key = this.prefix + (offer.title + "_" + offer.price).replace(/\s/g, "_");
    return crypto.createHash("sha1").update(key, "utf-8").digest("base64");
  }

  clear(key: string): boolean {
    return true;
  }

  private get(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          return reject(err);
        }
        resolve(!!reply);
      });
    });
  }

  async set(offer: Offer, exp?: number): Promise<boolean> {
    try {
      const key = this.buildKey(offer);
      if (await this.get(key)) {
        return false;
      }
      logger.info(`Set new offer in cache: ${key}`);
      this.client.set(key, JSON.stringify(offer));
      return true;
    } catch (err) {
      logger.error({ message: err.message, stack: err.stack });
      return false;
    }
  }
}
