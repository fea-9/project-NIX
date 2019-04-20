import * as request from "../../axiosConfig";

const documentsRequest = () => ({
  type: "DOC_REQUEST"
});

const documentsRequestSuccess = payload => ({
  type: "DOC_REQUEST_SUCCSESS",
  payload
});

const documentsRequestFail = error => ({
  type: "DOC_REQUEST_FAIL",
  error
});

export const setData = payload => ({
  type: "DOC_SET",
  payload
});

export const getDocuments = () => async dispatch => {
  dispatch(documentsRequest());
  try {
    const { data } = await request.getDocuments();

    dispatch(documentsRequestSuccess(data));
  } catch (error) {
    dispatch(documentsRequestFail(error));
  }
};
