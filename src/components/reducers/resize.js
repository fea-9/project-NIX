import initialState from "../store/initialState";

export default (state = initialState.resize, { type, payload }) => {
  switch (type) {
    case "CHECK_MOBILE_SIZE": {
      return { ...state, mobile: payload };
    }

    default:
      return state;
  }
};
