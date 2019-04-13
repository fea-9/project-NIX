import initialState from "../store/initialState";

export default (state = initialState.publicProfile, { type, payload, error }) => {
    switch (type) {
      case "PUBLIC_PROFILE_PENDING": {
        return { ...state, isFetching: true, initial: false };
      }
      case "PUBLIC_PROFILE_SUCCSESS": {
        return { data: payload ,error: false,  isFetching: false, initial: false};
      }
      case "PUBLIC_PROFILE_FAIL": {
        return { ...initialState.dashboardRange, error: true, isFetching: false, initial: false };
      }
      default:
        return state;
    }
};