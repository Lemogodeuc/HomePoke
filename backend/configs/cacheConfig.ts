import { CacheConfig } from "../types";

const cacheConfig: CacheConfig = {
  url: <string>process.env.REDIS_URL,
};

export default cacheConfig;
