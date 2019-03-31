import initialState from "../store/initialState";

export default (state = initialState.auth, { type, payload, error }) => {
	switch (type) {
		case "AUTH_REQUEST": {
			return { ...state, isFetching: true };
		}
		case "AUTH_REQUEST_SUCCESS": {
			const { Item, access_token, message } = payload;			
			return { ...state, error: false, user: Item, access_token, message, isFetching: false };
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
			const { user, access_token, message } = payload;			
			return { ...state, error: false, user, access_token, message, isFetching: false };
		}
		case "TOKEN_REFRESH_REQUEST_FAIL": {
			const {message} = error
			return { ...initialState.auth, error: true, message, isFetching: false };
		}
        
		default:
			return state;
	}
};