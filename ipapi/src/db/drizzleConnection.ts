import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

import { config } from "dotenv";
import { Context } from "hono";
import { env } from "hono/adapter";

const DB = async (c: Context) => {
  const { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME } = env(c);
  const config = {
    host: DATABASE_HOST,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    fetch: (url: string, init: any) => {
      delete init["cache"];
      return fetch(url, init);
    },
  };
  const conn = connect(config);
  const db = drizzle(conn);
  return db;
};

export { DB };
