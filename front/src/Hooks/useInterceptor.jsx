import { useRef } from "react";
import { axiosStrava, headersName } from "../API/models";
import { refreshTokenAPI } from "../API/refreshTknAPI";

export const useInterceptor = () => {
  useRef(
    axiosStrava.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log(
          "%cEstamos adentro del interceptor" + JSON.stringify(error),
          "font-weight:bold"
        );
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest?.sent) {
          previousRequest.sent = true;
          const data = await refreshTokenAPI.refreshToken();
          if (data?.access_token) {
            previousRequest.headers[headersName] =
              data.token_type + " " + data.access_token;
          }
          return axiosStrava(previousRequest);
        }
        return Promise.reject(error);
      }
    )
  );

  return undefined;
};
