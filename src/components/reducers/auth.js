import initialState from "../store/initialState";

export default (state = initialState.item, { type, payload }) => {
	switch (type) {
		case "GET": {
			return { ...state, isFetching: true };
		}
		case "GET_SUCCESS": {
			// const { id, data } = payload;			
			return { ...state,  isFetching: false };
		}
		case "GET_FAIL": {
			return { ...state, isFetching: false };
        }
        
		default:
			return state;
	}
};