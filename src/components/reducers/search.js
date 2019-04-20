import initialState from "../store/initialState";

export default (state = initialState.search, { type, payload, error }) => {
    switch (type) {
      case "SEARCH_REQUEST": {
        return { ...state, isFetching: true, initial: false };
      }
      case "SEARCH_REQUEST_SUCCESS": {
        return { data: payload, error: false,  isFetching: false, initial: false,};
      }
      case "SEARCH_REQUEST_FAIL": {
        return { ...initialState.search, error, isFetching: false, initial: false };
      }
      case "SEARCH_SET": {
        return { data: payload, error: null, isFetching: false, initial: false };
      }
      case "SEARCH_CLEAR":{
        return {...initialState.search}
      }
      default:
        return state;
    }
};