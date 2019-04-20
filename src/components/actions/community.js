import * as request from "../../axiosConfig";

const communityRequest = () => ({
  type: "COMMUNITY_REQUEST"
});

const communityRequestSuccess = payload => {
  return {
    type: "COMMUNITY_REQUEST_SUCCSESS",
    payload
  };
};

const communityRequestFail = error => {
  return {
    type: "COMMUNITY_REQUEST_FAIL",
    error
  };
};

export const getCommunity = () => async dispatch => {
  dispatch(communityRequest());
  try {
    const { data } = await request.getCommunity();

    dispatch(communityRequestSuccess(data));
  } catch (error) {
    dispatch(communityRequestFail(error));
  }
};
