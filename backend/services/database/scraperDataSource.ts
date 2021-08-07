import { Offer, ScrapRequest } from "../../types";
import { PoolClient } from "pg";
import { DataSource } from "./dataSource";

class ScraperDataSource extends DataSource {
  private client!: PoolClient;
  private logger!: any;
  private context!: any;

  constructor() {
    super();
  }

  initialize(context: any) {
    this.client = context.dbClient;
    this.logger = context.logger;
    this.context = context;
  }

  async insertOne(scraperRequest: Offer) {
    try {
      const values = Object.values(scraperRequest);
      const query = {
        text: `INSERT INTO "scrap_request"("title",
                                           "active",
                                           "status",
                                           "poll_interval",
                                           "url",
                                           "method",
                                           "profile_id",
                                           "provider_id")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING "id", "active", "status"`,
        values: values,
      };

      const { rows } = await this.client.query(query);
      return rows[0];
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async updateOne(scraperRequest: ScrapRequest) {
    try {
      const { id, title, frequency, url } = scraperRequest;
      const query = {
        text: `UPDATE "scrap_request"
                  SET "title" = $2,
                      "poll_interval" = $3,
                      "url" = $4
                WHERE "id" = $1
            RETURNING true`,
        values: [id, title, frequency, url],
      };

      const { rows } = await this.client.query(query);
      return !!rows[0].bool;
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async deleteOne(id: string | number) {
    try {
      const query = {
        text: `DELETE FROM "scrap_request"
                     WHERE "id" = $1
                 RETURNING true`,
        values: [id],
      };

      const { rows } = await this.client.query(query);
      return !!rows[0].bool;
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async getOneById(id: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "scrap_request" WHERE "id" = $1', [id]);
      return rows[0];
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAllByProfileId(profileId: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "scraping_view" WHERE "profileId" = $1', [profileId]);
      return rows;
    } catch (error) {
      console.log("Error", error);
      this.logger.error(error);
    }
  }
}

export default ScraperDataSource;
