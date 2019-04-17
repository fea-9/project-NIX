import * as request from "../../axiosConfig";

const communityRequest = () => ({
  type: "COMMUNITY_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const communityRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "COMMUNITY_REQUEST_SUCCSESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const communityRequestFail = action => {
  const { error } = action;
  return {
    type: "COMMUNITY_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

export function getCommunity() {
  return async function(dispatch) {
    dispatch(communityRequest());
    try {
      let payload = await request.getCommunity();

      dispatch(
        communityRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(
        communityRequestFail({
          error
        })
      );
    }
  };
}
