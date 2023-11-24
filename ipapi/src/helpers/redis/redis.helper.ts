import { Context } from "hono";
import { RedisConn } from "../../lib/redisConnection";

export const setDefaultUserData = async (c: Context) => {
  const redis = RedisConn(c);
  const count = await redis.incr("count");
  return count;
};
