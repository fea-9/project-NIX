import initialState from "../store/initialState";

export default (state = initialState.auth, { type, payload, error }) => {
	switch (type) {
		case "AUTH_REQUEST": {
			return { ...state, isFetching: true };
		}
		case "AUTH_REQUEST_SUCCESS": {
			const { Item, message } = payload;			
			return { ...state, error: false, user: Item, message, isFetching: false };
		}
		case "AUTH_REQUEST_FAIL": {
			const {message} = error
			return { ...initialState.auth, error: true, message, isFetching: false };
		}
		case "AUTH_RESET": {
			return { ...initialState.auth, isFetching: false };
		}

		case "TOKEN_REFRESH_REQUEST": {
			return { ...state, isFetching: true };
		}
		case "TOKEN_REFRESH_REQUEST_SUCCESS": {
			const { user, message } = payload;			
			return { ...state, error: false, user, message, isFetching: false };
		}
		case "TOKEN_REFRESH_REQUEST_FAIL": {
			const {err} = error
			return { ...initialState.auth, error: err, isFetching: false };
		}
        
		default:
			return state;
	}
};