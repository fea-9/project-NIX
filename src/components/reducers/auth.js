import initialState from "../store/initialState";

export default (state = initialState.auth, { type, payload, error }) => {
  switch (type) {
    case "AUTH_REQUEST": {
      return { ...state, isFetching: true };
    }
    case "AUTH_REQUEST_SUCCESS": {
      const { Item } = payload;
      return {
        ...state,
        error: false,
        user: Item,
        message: null,
        isFetching: false
      };
    }
    case "AUTH_REQUEST_FAIL": {
      return {
        ...state,
        error: true,
        message: error.response.data.message,
        isFetching: false
      };
    }
    case "AUTH_RESET": {
      return { ...initialState.auth, isFetching: false };
    }

    case "AUTH_UPDATE_REQUEST": {
      return { ...state, isFetching: true };
    }
    case "AUTH_UPDATE_REQUEST_SUCCESS": {
      return {
        ...state,
        error: false,
        user: payload,
        message: null,
        isFetching: false
      };
    }
    case "AUTH_UPDATE_REQUEST_FAIL": {
      return {
        ...state,
        error: true,
        message: error.response.data.message,
        isFetching: false
      };
    }

    case "TOKEN_REFRESH_REQUEST": {
      return { ...state, isFetching_token: true };
    }
    case "TOKEN_REFRESH_REQUEST_SUCCESS": {
      const { Item } = payload;
      return { ...state, error: false, user: Item, isFetching_token: false };
    }
    case "TOKEN_REFRESH_REQUEST_FAIL": {
      return { ...initialState.auth, error, isFetching_token: false };
    }

    case "INTERCEPTOR_WORKING_SET": {
      return { ...state, interseptrorWorking: payload };
    }

    default:
      return state;
  }
};
