import { Hono } from "hono";
import {
  getInfoControllerPOST,
  getInfoControllerGET,
} from "../controllers/getInfo.controller";

const getInfoRouter = new Hono();

getInfoRouter.post("/", getInfoControllerPOST);
getInfoRouter.get("/", getInfoControllerGET);

export { getInfoRouter };
