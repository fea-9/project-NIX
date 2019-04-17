import * as request from "../../axiosConfig";

const transDocRequest = () => ({
  type: "TRANS_DOC_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const transDocRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "TRANS_DOC_REQUEST_SUCCSESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const transDocRequestFail = action => {
  const { error } = action;
  return {
    type: "TRANS_DOC_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

export function getTransDoc() {
  return async function(dispatch) {
    dispatch(transDocRequest());
    try {
      let payload = await request.getKeywords();

      dispatch(
        transDocRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(
        transDocRequestFail({
          error
        })
      );
    }
  };
}
