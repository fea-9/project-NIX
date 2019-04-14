import initialState from "../store/initialState";

export default (state = initialState.search, { type, payload, error,}) => {
    switch (type) {
      case "SEARCH_PENDING": {
        return { ...state, isFetching: true, initial: false };
      }
      case "SEARCH_SUCCSESS": {
        return { data: payload, error: false,  isFetching: false, initial: false,};
      }
      case "SEARCH_FAIL": {
        return { ...initialState.search, error: true, isFetching: false, initial: false };
      }
      case "SEARCH_CLEAR":{
        return {...initialState.search}
      }
      default:
        return state;
    }
};