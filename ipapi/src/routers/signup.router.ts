import { Hono } from "hono";
import {
  googleCallbackUri,
  signUpWithGoogleGET,
  signUpWithGooglePOST,
} from "../controllers/signup.controller";

const signUpRouter = new Hono();

signUpRouter.get("/signup-google", (c) => signUpWithGooglePOST(c));
// signUpRouter.get("/signup-google", signUpWithGoogleGET);
signUpRouter.get("/google/callback", googleCallbackUri);
export { signUpRouter };
