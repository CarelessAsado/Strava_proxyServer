import axios from "axios";
const url = "https://www.strava.com/api/v3";
//esto lo tengo q hacer + dinamico
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
const axiosStrava = axios.create({
  baseURL: url,
});
const headersName = "Authorization";

axiosStrava.defaults.headers[headersName] = "Bearer " + accessToken;
export { axiosStrava, headersName };
