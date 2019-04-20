import { authLogout } from "./auth";
import * as request from "../../axiosConfig";

const tokenRefreshRequest = () => ({
  type: "TOKEN_REFRESH_REQUEST"
});

const tokenRefreshRequestSuccess = payload => ({
  type: "TOKEN_REFRESH_REQUEST_SUCCESS",
  payload
});

const tokenRefreshRequestFail = error => ({
  type: "TOKEN_REFRESH_REQUEST_FAIL",
  error
});

export const refreshTokens = () => async dispatch => {
  dispatch(tokenRefreshRequest());
  try {
    const { data } = await request.refreshToken();

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.Item.refresh_token);

    dispatch(tokenRefreshRequestSuccess(data));
  } catch (error) {
    dispatch(tokenRefreshRequestFail(error));
    dispatch(authLogout());
  }
};
