// const {verify} = require('hcaptcha');

import { Context } from "hono";
import { env } from "hono/adapter";
import {
  getUserDetailsFromGoogle,
  verifyGoogleAccessToken,
} from "../helpers/oauth.google.helper";

export const signUpWithGooglePOST = (c: Context) => {
  const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_REDIRECT_URI } = env(c);
  const googleSignInURL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${GOOGLE_OAUTH_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
  console.log(GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_REDIRECT_URI);
  c.status(302);
  return c.redirect(googleSignInURL);
};

export const signUpWithGoogleGET = (c: Context) => {
  return c.text("Helllo");
};

export const googleCallbackUri = async (c: Context) => {
  const { GOOGLE_OAUTH_CLIENT_ID: clientId } = env(c);
  const { code } = c.req.query();
  try {
    const userDetails = await getUserDetailsFromGoogle(code, c);

    const isAccessTokenVerified = await verifyGoogleAccessToken(
      userDetails.data.access_token,
      clientId,
    );
    if (!isAccessTokenVerified)
      throw Error(`{code:403,text:"your are not authenticated"}`);
    return c.text(code);
  } catch (error) {
    console.log(error);
    if (!code) {
      c.status(400);
      return c.text("you are doing it wrong");
    }
    const parsedMessage = JSON.parse(error as unknown as string);

    c.status(parsedMessage.code ? parsedMessage.code : 400);
    return c.text(parsedMessage.text ? parsedMessage.text : "error here ");
  }
};
