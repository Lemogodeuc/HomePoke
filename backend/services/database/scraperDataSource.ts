import { Offer } from "../../types";
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
        text: `INSERT INTO "scrap_request"("active",
                                           "title",
                                           "status",
                                           "fetch_only_once",
                                           "poll_interval",
                                           "url",
                                           "method",
                                           "last_error",
                                           "profile_id",
                                           "provider_id",
                                           "request_header_id"
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 RETURNING "id"`,
        values: values,
      };

      const { rows } = await this.client.query(query);
      return rows[0];
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
      const { rows } = await this.client.query('SELECT * FROM "scraping_view" WHERE "id" = $1', [profileId]);
      return rows;
    } catch (error) {
      console.log("Error", error)
      this.logger.error(error);
    }
  }
}

export default ScraperDataSource;