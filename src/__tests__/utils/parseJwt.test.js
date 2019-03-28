import { parseJwt } from "../../utils/parseJwt";
import { shallow } from "enzyme";
import Item from "antd/lib/list/Item";

describe("parseJwt", () => {
  const trueJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMWE0MGM0NmMtZjA2OS00NzY0LWFjMzctNTE0NzIyOWNlNmU1IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlSWQiOjF9LCJpYXQiOjE1NTM3MzEzMzYsImV4cCI6MTU1MzczNDkzNn0.Fsw6c9_JooRFyAZJ4jJjZ9-ZCcUJP4f6VsdwdAdG34M";

  const result = {
    "user": {
      "id": "1a40c46c-f069-4764-ac37-5147229ce6e5",
      "email": "admin@admin.com",
      "roleId": 1
    },
    "iat": 1553731336,
    "exp": 1553734936
  };

  it("returned object from after parse jwt", () => {
    expect(parseJwt(trueJwt)).toEqual(result);
  });
});
