import { Pool } from "pg";
import { dbConfig } from "../configs";

const dbClient = new Pool(dbConfig);

export default dbClient;
