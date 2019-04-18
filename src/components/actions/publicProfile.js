import * as request from "../../axiosConfig";

const publicProfileRequest = () => ({
  type: "PUBLIC_PROFILE_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const publicProfileRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "PUBLIC_PROFILE_REQUEST_SUCCSESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const publicProfileRequestFail = action => {
  const { error } = action;
  return {
    type: "PUBLIC_PROFILE_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

export function getPublicProfile(id) {
  return async function(dispatch) {
    dispatch(publicProfileRequest());
    try {
      const { data } = await request.getCommunityMember(id);
      const payload = data;

      dispatch(
        publicProfileRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(
        publicProfileRequestFail({
          error
        })
      );
    }
  };
}
