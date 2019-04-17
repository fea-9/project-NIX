import * as request from "../../axiosConfig";

const dashboardRequest = () => ({
  type: "DASH_REQUEST",
  status: "PENDING",
  payload: null,
  error: null
});

const dashboardRequestSuccess = action => {
  const { payload } = action;
  return {
    type: "DASH_REQUEST_SUCCSESS",
    status: "RESOLVED",
    payload,
    error: null
  };
};

const dashboardRequestFail = action => {
  const { error } = action;
  return {
    type: "DASH_REQUEST_FAIL",
    status: "REJECTED",
    payload: null,
    error
  };
};

export function getStats(params) {
  return async function(dispatch) {
    dispatch(dashboardRequest());
    try {
      let payload = await request.getStats(params.period);

      dispatch(
        dashboardRequestSuccess({
          payload
        })
      );
    } catch (error) {
      dispatch(
        dashboardRequestFail({
          error
        })
      );
    }
  };
}
