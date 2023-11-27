import { Context } from "hono";
import { RedisConn } from "../lib/redisConnection";
import { Ratelimit } from "@upstash/ratelimit";
import { parsedErrorText } from "../helpers/errorParsing";

export const rate5perMin = async (c: Context, next: any) => {
  try {
    const start = new Date();
    const ipAddress = c.req.header("cf-connecting-ip");
    const redis = RedisConn(c);
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.tokenBucket(5, "30 s", 5),
    });

    const identifier = ipAddress as string;
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      c.status(429);
      return c.text("too many requests are coming out !");
    }
    const end = new Date();
    console.log("Duration is :~ ", end - start);
    await next();
  } catch (error: any) {
    const errorMsg = error?.message;
    return c.text(errorMsg?.text);
  }
};
