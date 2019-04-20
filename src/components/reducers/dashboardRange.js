import initialState from "../store/initialState";

export default (
  state = initialState.dashboardRange,
  { type, payload, error }
) => {
  switch (type) {
    case "DASH_REQUEST": {
      return { ...state, isFetching: true, initial: false };
    }
    case "DASH_REQUEST_SUCCSESS": {
      return { data: payload, error: false, isFetching: false, initial: false };
    }
    case "DASH_REQUEST_FAIL": {
      return {
        ...initialState.dashboardRange,
        error,
        initial: false
      };
    }
    default:
      return state;
  }
};
