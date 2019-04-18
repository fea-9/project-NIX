import { authLogout } from "./auth";
import * as request from "../../axiosConfig";

const tokenRefreshRequest = () => ({
  type: "TOKEN_REFRESH_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const tokenRefreshRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "TOKEN_REFRESH_REQUEST_SUCCESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const tokenRefreshRequestFail = action => {
  const { error } = action;
  return {
    type: "TOKEN_REFRESH_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

export function refreshTokens() {
  return async function(dispatch) {
    dispatch(tokenRefreshRequest());
    try {
      const { data } = await request.refreshToken();
      const payload = data;

      data.access_token &&
        localStorage.setItem("access_token", data.access_token);
      data.Item &&
        localStorage.setItem("refresh_token", data.Item.refresh_token);

      dispatch(
        tokenRefreshRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(tokenRefreshRequestFail({ error }));
      dispatch(authLogout());
    }
  };
}
