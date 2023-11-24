import { Context } from "hono";
import { setDefaultUserData } from "../helpers/redis/redis.helper";
import { RedisConn } from "../lib/redisConnection";

export const testingControllerGET = async (c: Context) => {
  const start = new Date();

  const randomText = crypto.randomUUID();
  const count = await setDefaultUserData(c);
  const count2 = await setDefaultUserData(c);
  const redis = RedisConn(c);
  const userData = await redis.hmset(`user:1`, {
    name: "abhinav",
    ip: 2,
    access_token: "3dljf",
  });
  const end = new Date();
  const duration = end - start;
  return c.text(JSON.stringify(duration));
};

export const showLocation = async (c: Context) => {
  const ipAddress = c.req.header("cf-connecting-ip");

  try {
    const locationData = await fetch(`http://ip-api.com/json/${ipAddress}`)
      .then(function (response) {
        return response.json().then((jsonData) => {
          // console.log(jsonData);
          return jsonData;
        });
      })
      .catch(function (error) {
        console.log(error);
        throw Error(`{text:"error",code:400}`);
      });

    return c.json(locationData);
  } catch (error: any) {
    const parsedError = JSON.parse(error?.message);
    const statusCode = parsedError.code ? parsedError.code : 400;
    const errorMessage = parsedError.text ? parsedError.text : "error default";

    c.status(statusCode);
    return c.text(errorMessage);
  }
};


export const timeTesting  = (c:Context)=>{

  return c.text("hello")
}