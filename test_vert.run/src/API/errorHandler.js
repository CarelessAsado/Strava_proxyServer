import { failureFetchingActivities } from "../Context/activitiesSlice";

function errorHandler(dispatch, error, etapa) {
  console.log(JSON.stringify(error));
  console.log("%c" + etapa, "color:red");
  console.log("%c" + error?.response?.status, "color:red");
  dispatch(failureFetchingActivities(error?.response?.data));
}

export { errorHandler };
