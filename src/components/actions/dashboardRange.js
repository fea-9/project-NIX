import * as request from "../../axiosConfig";

const dashboardRequest = () => ({
  type: "DASH_REQUEST"
});

const dashboardRequestSuccess = payload => ({
  type: "DASH_REQUEST_SUCCSESS",
  payload
});

const dashboardRequestFail = error => ({
  type: "DASH_REQUEST_FAIL",
  error
});

export const getStats = params => async dispatch => {
  dispatch(dashboardRequest());
  try {
    const { data } = await request.getStats(params.period);

    dispatch(dashboardRequestSuccess(data));
  } catch (error) {
    dispatch(dashboardRequestFail(error));
  }
};
