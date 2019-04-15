export const parseJwt = jwt => {
  let base64 = jwt
    .split(".")[1]
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
};
