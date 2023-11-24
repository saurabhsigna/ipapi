import { Hono } from "hono";
import { env } from "hono/adapter";
import { indexRouterFxn } from "./routers";
const app = new Hono();

indexRouterFxn(app);
app.get("/", (c) => c.text("Hello Hono! 2"));

export default app;
