import { checkTokenExpired } from "../../utils/checkTokenExpired";

describe("checkTokenExpired", () => {
  const jwtOld =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMWE0MGM0NmMtZjA2OS00NzY0LWFjMzctNTE0NzIyOWNlNmU1IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlSWQiOjF9LCJpYXQiOjE1NTM3MzEzMzYsImV4cCI6MTU1MzczNDkzNn0.Fsw6c9_JooRFyAZJ4jJjZ9-ZCcUJP4f6VsdwdAdG34M";

  const jwtNew =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTM3NDMwMDAsImV4cCI6NzI2NTQ3NDIwMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.sZD-FAgkJ_xvmLV_MaGlTCuCuHzFTk8FWXkskmHQRDw";

  it("return true", () => {
    expect(checkTokenExpired(jwtNew)).toBeTruthy();
  });

  it("return false", () => {
    expect(checkTokenExpired(jwtOld)).not.toBeTruthy();
  });
});
