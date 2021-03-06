import { failureFetchingActivities } from "../Context/activitiesSlice";

function errorHandler(dispatch, error, etapa) {
  console.log(JSON.stringify(error));
  console.log("%c" + etapa, "color:red");
  if (
    error.message === "Network Error" ||
    error.message === "Failed to fetch"
  ) {
    return dispatch(failureFetchingActivities(error.message));
  }
  dispatch(failureFetchingActivities(error?.response?.data?.message));
}

export { errorHandler };
