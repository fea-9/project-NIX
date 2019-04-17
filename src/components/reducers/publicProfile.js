import initialState from "../store/initialState";

export default (state = initialState.publicProfile, { type, payload, error }) => {
    switch (type) {
      case "PUBLIC_PROFILE_REQUEST": {
        return { ...state, isFetching: true, initial: false };
      }
      case "PUBLIC_PROFILE_REQUEST_SUCCSESS": {
        return { data: payload ,error: false,  isFetching: false, initial: false};
      }
      case "PUBLIC_PROFILE_REQUEST_FAIL": {
        return { ...initialState.dashboardRange, error, isFetching: false, initial: false };
      }
      default:
        return state;
    }
};