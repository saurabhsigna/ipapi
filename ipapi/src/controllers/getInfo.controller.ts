import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Context } from "hono";
import { env } from "hono/adapter";
import { DB } from "../db/drizzleConnection";
import { albums, users } from "../db/schema/schema";

export const getInfoControllerPOST = async (c: Context) => {
  const ipAddress = c.req.header("cf-connecting-ip");
  console.log(ipAddress);
  await fetch(`https://ipapi.co/json/`)
    .then(function (response) {
      response.json().then((jsonData) => {
        console.log(jsonData);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  const db = await DB(c);

  const data = await db.select().from(albums);

  return c.json(data);
};

export const getInfoControllerGET = async (c: Context) => {
  const ipAddress = c.req.header("cf-connecting-ip");
  const { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME } = env(c);
  await fetch(`http://ip-api.com/json/${ipAddress}`)
    .then(function (response) {
      response.json().then((jsonData) => {
        console.log(jsonData);
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  const db = await DB(c);
  const data = await db.select().from(users);
  console.log(data);
  return c.text(ipAddress as string);
};
