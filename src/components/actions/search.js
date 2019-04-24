import * as request from "../../axiosConfig";

export const searchClear = () => ({
  type: "SEARCH_CLEAR"
});

export const setSearchData = payload => ({
  type: "SEARCH_SET",
  payload
});

const searchRequest = () => ({
  type: "SEARCH_REQUEST"
});

const searchRequestSuccess = payload => ({
  type: "SEARCH_REQUEST_SUCCESS",
  payload
});

const searchRequestFail = error => ({
  type: "SEARCH_REQUEST_FAIL",
  error
});

export const getSearch = searchQuery => async dispatch => {
  dispatch(searchRequest());
  try {
    const { data } = await request.search(searchQuery);

    dispatch(searchRequestSuccess(data));
  } catch (error) {
    dispatch(searchRequestFail(error));
  }
};
