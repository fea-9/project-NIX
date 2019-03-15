import * as types from "../constants/actionTypes";

import initialState from "../store/initialState";

export default (state = initialState.table, { type, payload }) => {
	switch (type) {
		case types.GET: {
			return { ...state, isFetching: true };
		}
		case types.GET_SUCCESS: {
			// const { id, data } = payload;			
			return { ...state,  isFetching: false };
		}
		case types.GET_FAIL: {
			return { ...state, isFetching: false };
        }
        
		default:
			return state;
	}
};