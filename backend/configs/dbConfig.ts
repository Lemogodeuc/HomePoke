import { PoolConfig } from "pg";

const dbConfig: PoolConfig = {
  user: process.env.PGUSER || "",
  password: process.env.PGPASSWORD || "",
  host: process.env.PGHOST || "",
  database: process.env.PGDATABASE || "",
  port: (process.env.PGPORT && +process.env.PGPORT) || 5432,
};

export default dbConfig;
