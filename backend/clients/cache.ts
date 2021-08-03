import redis from "redis";
import { cacheConfig } from "../configs";

const cacheClient = redis.createClient(cacheConfig);

export default cacheClient;
