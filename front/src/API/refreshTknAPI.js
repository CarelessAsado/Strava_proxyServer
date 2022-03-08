import { axiosStrava } from "./models";

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export const refreshTokenAPI = {
  refreshToken: async () => {
    try {
      const { data: newTokens } = await axiosStrava.post(
        `/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=5266e83921f0410e76c4161de667c317227c4689`
      );
      console.log(
        "%c" +
          JSON.stringify(newTokens) +
          "esto hay q guardarlo en algun lugar importante",
        "color:green"
      );

      /*------Actualizar headers*/
      /*-al final no actualizo los headers aca ya q estoy obligado a actualizarlos dentro del error.config del axios interceptor, el cual dsp debo devolver dentro de la axiosPOSTLogin instance*/
      /*--------Actualizar state, no es necesario localStoragear el ACCESSTOKEN ahora*/
      /*-------Podria haber puesto el saveItem del localStorage como un useEffect???*/
      return newTokens;
    } catch (error) {
      console.log(
        error.response.status,
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
