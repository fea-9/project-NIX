import * as request from "../../axiosConfig";

const documentsRequest = () => ({
  type: "DOC_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const documentsRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "DOC_REQUEST_SUCCSESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const documentsRequestFail = action => {
  const { error } = action;
  return {
    type: "DOC_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

export const setData = payload => ({ type: "DOC_SET", payload });

export function getDocuments() {
  return async function(dispatch) {
    dispatch(documentsRequest());
    try {
      const { data } = await request.getDocuments();
      const payload = data;

      dispatch(
        documentsRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(
        documentsRequestFail({
          error
        })
      );
    }
  };
}
