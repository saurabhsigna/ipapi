import { Context } from "hono";

export const parsedErrorText = (c: Context, errorMessage: string) => {
  console.log("eror message is ", typeof errorMessage);
  const parsedError = JSON.parse(errorMessage );
  const statusCode = parsedError.code ? parsedError.code : 400;
  const errorText = parsedError.text ? parsedError.text : "error default";

  //   c.status(statusCode);
  //   c.text(errorText);
};
