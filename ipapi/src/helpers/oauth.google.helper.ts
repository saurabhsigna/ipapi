import { Context } from "hono";
import { env } from "hono/adapter";
import jwt from "@tsndr/cloudflare-worker-jwt";

async function getUserDetailsFromGoogle(code: string, c: Context) {
  // Implement the token exchange logic with Google API here
  // You'll need to make a request to Google's token endpoint with the authorization code
  const {
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_REDIRECT_URI,
    GOOGLE_OAUTH_CLIENT_SECRET,
  } = env(c);
  // Example (note: this is just a placeholder, you need to implement the actual logic)
  const tokenEndpoint = "https://www.googleapis.com/oauth2/v4/token";
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: GOOGLE_OAUTH_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    // If the response status is not in the range 200-299, it indicates an error
    const errorData = await response.json();
    throw new Error(
      `Failed to exchange code with Google API: ${
        response.statusText
      }. Details: ${JSON.stringify(errorData)}`,
    );
  }

  const data: any = await response.json();

  // Assuming the response contains user details, return them
  return {
    data,
  };
}

async function verifyGoogleAccessToken(accessToken: string, clientId: string) {
  const validatorUri = `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`;

  const verifiedResponse = await fetch(validatorUri);
  const response: any = await verifiedResponse.json();
  if (!verifiedResponse.ok) return false;
  if (response?.aud == clientId) {
    return true;
  } else {
    return false;
  }
}

export { getUserDetailsFromGoogle, verifyGoogleAccessToken };
