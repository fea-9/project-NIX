import initialState from "../store/initialState";

export default (state = initialState.transDocGraph, { type, payload, error }) => {
    switch (type) {
      case "TRANS_DOC_PENDING": {
        return { ...state, isFetching: true, initial: false };
      }
      case "TRANS_DOC_SUCCSESS": {
        return { data: payload ,error: false,  isFetching: false, initial: false};
      }
      case "TRANS_DOC_FAIL": {
        return { ...initialState.documents, error: true, isFetching: false, initial: false };
      }
      default:
        return state;
    }
};