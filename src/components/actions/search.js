import * as request from "../../axiosConfig";

export const searchClear = () => ({
  type: "SEARCH_CLEAR"
});

export const setSearchData = payload => ({ type: "SEARCH_SET", payload });

const searchRequest = () => ({
  type: "SEARCH_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const searchRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "SEARCH_REQUEST_SUCCESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const searchRequestFail = action => {
  const { error } = action;
  return {
    type: "SEARCH_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

export function getSearch(searchQuery) {
  return async function(dispatch) {
    dispatch(searchRequest());
    try {
      let payload = await request.search(searchQuery);

      dispatch(
        searchRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(searchRequestFail({ error }));
    }
  };
}
