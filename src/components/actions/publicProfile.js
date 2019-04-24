import * as request from "../../axiosConfig";

const publicProfileRequest = () => ({
  type: "PUBLIC_PROFILE_REQUEST"
});

const publicProfileRequestSuccess = payload => ({
  type: "PUBLIC_PROFILE_REQUEST_SUCCSESS",
  payload
});

const publicProfileRequestFail = error => ({
  type: "PUBLIC_PROFILE_REQUEST_FAIL",
  error
});

export const getPublicProfile = id => async dispatch => {
  dispatch(publicProfileRequest());
  try {
    const { data } = await request.getCommunityMember(id);

    dispatch(publicProfileRequestSuccess(data));
  } catch (error) {
    dispatch(publicProfileRequestFail(error));
  }
};
