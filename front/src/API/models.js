import axios from "axios";
const url = "https://www.strava.com/api/v3";

const axiosStrava = axios.create({
  baseURL: url,
});
const headersName = "Authorization";

const proxyServerUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://strave-hidemykeys.herokuapp.com/";

const proxyServerAxios = axios.create({ baseURL: proxyServerUrl });
export { axiosStrava, headersName, proxyServerAxios };
