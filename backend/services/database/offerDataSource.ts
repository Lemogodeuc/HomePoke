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
      values.unshift(1);

      const query = {
        text: `INSERT INTO "offer"("user_id",
                                   "active",
                                   "title",
                                   "description",
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
                                   "publication_date")
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

  async deleteOneById(id: string | number) {
    try {
      const query = {
        text: `UPDATE "offer"
                  SET "is_delete" = 'true'
                WHERE "id" = $1
            RETURNING true`,
        values: [id],
      };

      const { rows } = await this.client.query(query);

      return rows[0].bool === "true";
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async updateOneById(id: number, attribut: string, value: boolean) {
    try {
      const column = "is_" + attribut;
      const resultKey = "is" + attribut[0].toUpperCase() + attribut.slice(1);
      const query = {
        text: `UPDATE "offer"
                  SET "${column}" = $2
                WHERE "id" = $1
            RETURNING "${column}" AS "${resultKey}"`,
        values: [id, value],
      };

      const { rows } = await this.client.query(query);
      return rows[0];
    } catch (error) {
      this.logger.verbose(error);
    }
  }

  async getOneById(id: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "offer_view" WHERE "id" = $1', [id]);

      return rows[0];
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAllByUserId(userId: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "offer_view" WHERE "userId" = $1', [userId]);

      return rows;
    } catch (error) {
      this.logger.error(error);
    }
  }
}

export default OfferDataSource;
