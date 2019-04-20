import * as request from "../../axiosConfig";
import history from "../../history";

const authUpdateRequest = () => ({
  type: "AUTH_UPDATE_REQUEST"
});

const authUpdateRequestSuccess = payload => ({
  type: "AUTH_UPDATE_REQUEST_SUCCESS",
  payload
});

const authUpdateRequestFail = error => ({
  type: "AUTH_UPDATE_REQUEST_FAIL",
  error
});

const authRequest = () => ({
  type: "AUTH_REQUEST"
});

const authRequestSuccess = payload => ({
  type: "AUTH_REQUEST_SUCCESS",
  payload
});

const authRequestFail = error => ({
  type: "AUTH_REQUEST_FAIL",
  error
});

const resetAuth = () => ({
  type: "AUTH_RESET"
});

export const setInterceptorStatus = payload => ({
  type: "INTERCEPTOR_WORKING_SET",
  payload
});

export const authLogout = () => dispatch => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  dispatch(resetAuth());
};

export const updateUserRequest = (id, values) => async dispatch => {
  dispatch(authUpdateRequest());
  try {
    const { data } = await request.updateUser(id, values);

    dispatch(authUpdateRequestSuccess(data));
  } catch (error) {
    dispatch(authUpdateRequestFail(error));
  }
};

export const auth = (values, typeRequest) => async dispatch => {
  dispatch(authRequest());
  try {
    const { data } =
      typeRequest === "signin"
        ? await request.signIn(values)
        : typeRequest === "signup"
        ? await request.signUp(values)
        : null;

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.Item.refresh_token);
    dispatch(authRequestSuccess(data));
    history.push('/dashboard?period=day');
  } catch (error) {
    dispatch(authRequestFail(error));
  }
};
