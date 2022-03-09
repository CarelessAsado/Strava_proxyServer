import { failureFetchingActivities } from "../Context/activitiesSlice";

function errorHandler(dispatch, error, etapa) {
  console.log(JSON.stringify(error));
  console.log("%c" + etapa, "color:red");
  console.log("%c" + error?.response?.status, "color:red");
  if (error?.config?.sent) {
    console.log(
      "aca es un error de refresh token AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      error.config
    );
    //ver si hago algo dsp
  }

  if (
    error.message === "Network Error" ||
    error.message === "Failed to fetch"
  ) {
    return dispatch(
      failureFetchingActivities("Hubo un problema en la conexión.")
    );
  }
  dispatch(failureFetchingActivities(error?.response?.data));
}

export { errorHandler };
