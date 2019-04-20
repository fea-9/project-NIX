import * as request from "../../axiosConfig";

const transDocRequest = () => ({
  type: "TRANS_DOC_REQUEST"
});

const transDocRequestSuccess = payload => ({
  type: "TRANS_DOC_REQUEST_SUCCSESS",
  payload
});

const transDocRequestFail = error => ({
  type: "TRANS_DOC_REQUEST_FAIL",
  error
});

export const getTransDoc = () => async dispatch => {
  dispatch(transDocRequest());
  try {
    const { data } = await request.getKeywords();

    dispatch(transDocRequestSuccess(data));
  } catch (error) {
    dispatch(transDocRequestFail(error));
  }
};
