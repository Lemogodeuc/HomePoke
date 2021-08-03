import { Offer } from "../../types";
import { PoolClient } from "pg";
import { DataSource } from "./dataSource";

class OfferDataSource extends DataSource {
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

  async insertOne(offer: Offer) {
    try {
      const title = offer.title;
      const price = offer.price;
      const { listId, ...rest } = offer;
      const values = Object.values(rest);
      values.push(1);

      const query = {
        text: `INSERT INTO "offer"("active",
                                   "title",
                                   "descripion",
                                   "owner_name",
                                   "owner_type",
                                   "url",
                                   "city",
                                   "city_code",
                                   "location",
                                   "image_urls",
                                   "price",
                                   "including_charges",
                                   "type",
                                   "furnished",
                                   "surface",
                                   "rooms",
                                   "energy",
                                   "ges",
                                   "assets",
                                   "publication_date",
                                   "profile_id")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
                 RETURNING "id"`,
        values: values,
      };

      const { rows } = await this.client.query(query);
      this.logger.info("New offer recorded: " + title + " " + price);
      return rows[0];
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async getOneById(id: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "offer" WHERE "id" = $1', [id]);
      return rows[0];
    } catch (error) {
      this.logger.error(error);
    }
  }
  
  async getAllByProfileId(profileId: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "offer" WHERE "profile_id" = $1', [profileId]);
      return rows;
    } catch (error) {
      this.logger.error(error);
    }
  }
}

export default OfferDataSource;
