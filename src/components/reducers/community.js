import initialState from "../store/initialState";

export default (state = initialState.documents, { type, payload, error }) => {
  switch (type) {
    case "COMMUNITY_REQUEST": {
      return { ...state, isFetching: true, initial: false };
    }

    case "COMMUNITY_REQUEST_SUCCSESS": {
      return { data: payload, error: false, isFetching: false, initial: false };
    }

    case "COMMUNITY_REQUEST_FAIL": {
      return {
        ...initialState.documents,
        error,
        isFetching: false,
        initial: false
      };
    }

    default:
      return state;
  }
};
