import initialState from "../store/initialState";

export default (state = initialState.avatar, { type, payload }) => {
  switch (type) {
    case "AVATAR_SAVE": {
        const {src, scale} = payload
        return { ...state, src, scale };
    }
    case "AVATAR_RESET": {
        return { ...state };
    }

    default:
      return state;
  }
};
