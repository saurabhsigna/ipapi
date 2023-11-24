import { Hono } from "hono";
import { showLocation, testingControllerGET, timeTesting } from "../controllers/testing.controller";

const testingRouter = new Hono();

testingRouter.get("/", testingControllerGET);
testingRouter.get("/location", showLocation);
testingRouter.get("/time",timeTesting)
export { testingRouter };
