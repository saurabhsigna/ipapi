import { Redis } from "@upstash/redis/cloudflare";
import { Context } from "hono";
import { env } from "hono/adapter";
let redis: any;
export const RedisConn = (c: Context) => {
  const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } = env(c);
  if (!redis) {
    redis = Redis.fromEnv({
      UPSTASH_REDIS_REST_TOKEN,
      UPSTASH_REDIS_REST_URL,
    });
  }

  return redis;
};
