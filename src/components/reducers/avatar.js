import initialState from "../store/initialState";

export default (state = initialState.avatar, { type, payload }) => {
  switch (type) {
    case "AVATAR_SAVE": {
        const {src, scale, sourceSrc} = payload
        return { ...state, src, scale, sourceSrc };
    }
    case "AVATAR_RESET": {
        return { ...initialState.avatar };
    }

    default:
      return state;
  }
};
