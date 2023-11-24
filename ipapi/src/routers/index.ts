import { Hono } from "hono";
import { getInfoRouter } from "./getInfo.router";
import { signUpRouter } from "./signup.router";
import { testingRouter } from "./testing.router";

const indexRouterFxn = (app: Hono) => {
  app.route("/ip", getInfoRouter);
  app.route("/oauth", signUpRouter);
  app.route("/testing", testingRouter);
};

export { indexRouterFxn };
