import initialState from "../store/initialState";

export default (state = initialState.sidebar, { type, payload }) => {
  switch (type) {
    case "CHECK_SIDEBAR_SIZE": {
      return { ...state, minimized: !state.minimized };
    }

    default:
      return state;
  }
};
