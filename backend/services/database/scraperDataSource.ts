import { Offer, ScrapRequest } from "../../types";
import { PoolClient } from "pg";
import { DataSource } from "./dataSource";
import { mapKeys, camelCase } from "lodash";

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
        text: `INSERT INTO "request"("title",
                                     "active",
                                     "status",
                                     "poll_interval",
                                     "url",
                                     "method",
                                     "user_id",
                                     "provider_id")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING *`,
        values: values,
      };

      const { rows, rowCount } = await this.client.query(query);

      return rowCount ? mapKeys(rows[0], (_, key) => camelCase(key)) : null;
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async updateOne(scraperRequest: ScrapRequest) {
    try {
      const { id, title, frequency, url } = scraperRequest;
      const query = {
        text: `UPDATE "request"
                  SET "title" = $2,
                      "poll_interval" = $3,
                      "url" = $4
                WHERE "id" = $1
            RETURNING *`,
        values: [id, title, frequency, url],
      };

      const { rows, rowCount } = await this.client.query(query);

      return rowCount ? mapKeys(rows[0], (_, key) => camelCase(key)) : null;
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async toggleOne(id: number, value: boolean) {
    try {
      const query = {
        text: `UPDATE "request"
                  SET "active" = $2
                WHERE "id" = $1
            RETURNING true`,
        values: [id, value],
      };

      const { rows, rowCount } = await this.client.query(query);

      return rowCount && rows[0].bool === true;
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async deleteOne(id: string | number) {
    try {
      const query = {
        text: `DELETE FROM "request"
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
      const { rows } = await this.client.query('SELECT * FROM "request_view" WHERE "id" = $1', [id]);
      return rows[0];
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAllByUserId(userId: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "request_view" WHERE "userId" = $1', [userId]);
      console.log("[rows] ", rows);
      return rows;
    } catch (error) {
      console.log("Error", error);
      this.logger.error(error);
    }
  }
}

export default ScraperDataSource;
