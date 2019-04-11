import initialState from "../store/initialState";

export default (state = initialState.documents, { type, payload, error }) => {
    switch (type) {
      case "DOC_PENDING": {
        return { ...state, isFetching: true, initial: false };
      }
      case "DOC_SUCCSESS": {
        return { data: payload ,error: false,  isFetching: false, initial: false};
      }
      case "DOC_FAIL": {
        return { ...initialState.documents, error: true, isFetching: false, initial: false };
      }
      case "DOC_SET": {
        let newData = JSON.parse(JSON.stringify(state.data))
        newData.data = payload
        return { data: newData, error: null, isFetching: false, initial: false };
      }
      default:
        return state;
    }
};