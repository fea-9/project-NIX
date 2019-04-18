import * as request from "../../axiosConfig";

const authUpdateRequest = () => ({
  type: "AUTH_UPDATE_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const authUpdateRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "AUTH_UPDATE_REQUEST_SUCCESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const authUpdateRequestFail = action => {
  const { error } = action;
  return {
    type: "AUTH_UPDATE_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

const authRequest = () => ({
  type: "AUTH_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const authRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "AUTH_REQUEST_SUCCESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const authRequestFail = action => {
  const { error } = action;
  return {
    type: "AUTH_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

function resetAuth() {
  return {
    type: "AUTH_RESET",
    status: "REJECTED",
    payload: null,
    error: null
  };
}

export const setInterceptorStatus = payload => {
  return {
    type: "INTERCEPTOR_WORKING_SET",
    payload
  };
};

export function authLogout() {
  return function(dispatch) {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    dispatch(resetAuth());
  };
}

export function updateUserRequest(id, values) {
  return async function(dispatch) {
    dispatch(authUpdateRequest());
    try {
      const { data } = await request.updateUser(id, values);
      const payload = data;

      data.access_token &&
        localStorage.setItem("access_token", data.access_token);
      data.Item &&
        localStorage.setItem("refresh_token", data.Item.refresh_token);

      dispatch(
        authUpdateRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(
        authUpdateRequestFail({
          error
        })
      );
    }
  };
}

export function auth(values, typeRequest) {
  return async function(dispatch) {
    dispatch(authRequest());
    try {
      const { data } =
        typeRequest === "signin"
          ? await request.signIn(values)
          : typeRequest === "signup"
          ? await request.signUp(values)
          : null;
      const payload = data;
      payload.access_token &&
        localStorage.setItem("access_token", payload.access_token);
      payload.Item &&
        localStorage.setItem("refresh_token", payload.Item.refresh_token);
      dispatch(
        authRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(
        authRequestFail({
          error
        })
      );
    }
  };
}
