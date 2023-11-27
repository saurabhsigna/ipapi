import { Context } from "hono";
import { env } from "hono/adapter";
import { RedisConn } from "../lib/redisConnection";

export const rate5perMin = async (
  c: Context,
  next: any,
  maxRequests: number,
  rateInSec: number,
) => {
  try {
    const start = new Date();
    const ipAddress = c.req.header("cf-connecting-ip");
    const userKey = `user:${ipAddress}`;
    const redis = RedisConn(c);

    // const ratelimiterForUser = await redis.incr(userKey);
    const ratelimiterForUser = await increaseFxn(c, userKey);
    console.log(
      "ratelimitingforuser before checking it is presetn or not :~ ",
      ratelimiterForUser,
    );

    if (ratelimiterForUser == 1) {
      await redis.expire(userKey, rateInSec);
    } else if (ratelimiterForUser > maxRequests) {
      throw Error("error due to very requests");
    }
    const end = new Date();
    console.log("Duration is :~ ", end - start);

    await next();
  } catch (error) {
    c.status(400);
    return c.text("error in ratelimit2.ts middleware");
  }
};

const increaseFxn = async (c: Context, key: string) => {
  const start = new Date();
  const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = env(c);
  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/set/foo/bar`, {
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw Error("error in increaseFxn");
  }

  const data = await response.json();
  const end = new Date();
  console.log("duration of increaseFxn :~ ", end - start);
  console.log(data);
  return data;
};
