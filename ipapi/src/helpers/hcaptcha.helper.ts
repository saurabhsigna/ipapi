import { env } from "hono/adapter";

const { verify } = require("hcaptcha");

export const verifyHcaptcha = (secret: string, token: string) => {
  verify(secret, token).then((data: any) => {
    if (data.success === true) {
      return true;
    } else {
      return false;
    }
  });
};
