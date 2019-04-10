import initialState from "../store/initialState";

export default (state = initialState.documents, { type, payload, error }) => {
    switch (type) {
      case "COMMUN_PENDING": {
        return { ...state, isFetching: true, initial: false };
      }
      case "COMMUN_SUCCSESS": {
        return { data: payload ,error: false,  isFetching: false, initial: false};
      }
      case "COMMUN_FAIL": {
        return { ...initialState.documents, error: true, isFetching: false, initial: false };
      }
      default:
        return state;
    }
};