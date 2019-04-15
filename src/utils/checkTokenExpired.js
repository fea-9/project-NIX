import { parseJwt } from "./parseJwt";

export const checkTokenExpired = token => {
  let jwt = parseJwt(token);
  return !(jwt.exp < Date.now() / 1000);
};
