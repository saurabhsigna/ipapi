import { Hono } from "hono";
import {
  showLocation,
  testingControllerGET,
  timeTesting,
} from "../controllers/testing.controller";
import { rate5perMin } from "../middlewares/ratelimit";
import { rate5perMin as rate5perMin2 } from "../middlewares/ratelimit2";
const testingRouter = new Hono();

testingRouter.get("/", testingControllerGET);
testingRouter.get(
  "/location",
  (c, next) => rate5perMin2(c, next, 5, 30),
  // rate5perMin,
  showLocation,
);
testingRouter.get("/time", timeTesting);
export { testingRouter };
