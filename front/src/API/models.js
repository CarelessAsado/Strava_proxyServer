import axios from "axios";
const url = "https://www.strava.com/api/v3";
//esto lo tengo q hacer + dinamico
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
const axiosStrava = axios.create({
  baseURL: url,
});
const headersName = "Authorization";

axiosStrava.defaults.headers[headersName] = "Bearer " + accessToken;

const proxyServerUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "FALTA";

const proxyServerAxios = axios.create({ baseURL: proxyServerUrl });
export { axiosStrava, headersName, proxyServerAxios };
