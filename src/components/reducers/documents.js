import initialState from "../store/initialState";

export default (state = initialState.documents, { type, payload, error }) => {
    switch (type) {
      case "DOC_REQUEST": {
        return { ...state, isFetching: true, initial: false };
      }
      case "DOC_REQUEST_SUCCSESS": {
        return { data: payload ,error: false,  isFetching: false, initial: false};
      }
      case "DOC_REQUEST_FAIL": {
        return { ...initialState.documents, error, isFetching: false, initial: false };
      }
      case "DOC_SET": {
        return { data: payload, error: null, isFetching: false, initial: false };
      }
      default:
        return state;
    }
};