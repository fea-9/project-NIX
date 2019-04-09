import initialState from "../store/initialState";

export default (state = initialState.dashboardRange, { type, payload, error }) => {
    switch (type) {
      case "DASH_PENDING": {
        return { ...state, isFetching: true, initial: false };
      }
      case "DASH_SUCCSESS": {
        return { data: payload ,error: false,  isFetching: false, initial: false};
      }
      case "DASH_FAIL": {
        return { ...initialState.dashboardRange, error: true, isFetching: false, initial: false };
      }
      default:
        return state;
    }
};