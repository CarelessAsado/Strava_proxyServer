import { proxyServerAxios } from "./models";

export const refreshTokenAPI = {
  refreshToken: async () => {
    try {
      const { data: newAccessTkn } = await proxyServerAxios.get();
      console.log(
        "%c" +
          JSON.stringify(newAccessTkn) +
          "esto hay q guardarlo en algun lugar importante",
        "color:blue"
      );

      /*------Actualizar headers*/
      /*-al final no actualizo los headers aca ya q estoy obligado a actualizarlos dentro del error.config del axios interceptor, el cual dsp debo devolver dentro de la axiosPOSTLogin instance*/
      /*--------Actualizar state, no es necesario localStoragear el ACCESSTOKEN ahora*/
      /*-------Podria haber puesto el saveItem del localStorage como un useEffect???*/
      return newAccessTkn;
    } catch (error) {
      console.log(JSON.stringify(error.message));
      console.log(
        error?.response?.status,
        "en refreshTkn api, ver si el codigo de error es 401 tmb q puede provocar loop"
      );
      /*---devuelvo el error al interceptor, asi dsp se llama al logErrorAPI con la original call, no la del interceptor*/
      return error;
      /*       errorHandler(
        error,
        dispatch,
        "REFRESH TOKEN IF ACCESS TOKEN EXPIRED"
      ); */
    }
  },
};
