import { Offer } from "../../types";
import { PoolClient } from "pg";
import { DataSource } from "./dataSource";


class UserDataSource extends DataSource {
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
    
  }

  async getOneById(id: number) {
    try {
      const { rows } = await this.client.query('SELECT * FROM "user" WHERE "id" = $1', [id]);
      return rows[0];
    } catch (error) {
      this.logger.error(error);
    }
  }

  getOne(offer: Offer) {}
}

export default UserDataSource;
