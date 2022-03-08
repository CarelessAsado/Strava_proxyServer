import {
  beginFetchingActivities,
  successFetchingActivities,
  successFetchingStats,
} from "../Context/activitiesSlice";
import { errorHandler } from "./errorHandler";
import { axiosStrava } from "./models";

export const stravaAPI = {
  getUser: async function (dispatch) {
    try {
      const { data } = await axiosStrava.get();
      console.log(data);
      return data;
    } catch (error) {
      //armar el ERROR HANDLER p/Axios
      errorHandler(dispatch, error, "getuser/athlete");
    }
  },
  getActivities: async function (dispatch) {
    dispatch(beginFetchingActivities());
    try {
      const oneMonthAgo = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30;
      const { data } = await axiosStrava.get(
        "/athlete/activities?after=" + oneMonthAgo
      );
      const cleansedData = cleanseMyData(data);
      console.log(cleansedData, "data limpia");
      dispatch(successFetchingActivities(cleansedData));
      console.log(data, "DATTA Q VUELVE DE AXIOS");
      return data;
    } catch (error) {
      //armar el ERROR HANDLER p/Axios
      errorHandler(dispatch, error, "getACTIVITIES");
    }
  },
  getActivitiesPerMonth: async function (dispatch, year, month) {
    dispatch(beginFetchingActivities());
    const after = Date.parse(month + "0" + year) / 1000;
    const before = after + 60 * 60 * 24 * 30;
    try {
      const { data } = await axiosStrava.get(
        `/athlete/activities?after=${after}&before=${before}`
      );
      const cleansedData = cleanseMyData(data);
      console.log(cleansedData, "data limpia");
      dispatch(successFetchingActivities(cleansedData));
      console.log(data, "DATTA Q VUELVE DE AXIOS");
      return data;
    } catch (error) {
      //armar el ERROR HANDLER p/Axios
      errorHandler(dispatch, error, "get PER MONTH ACTIVITIES");
    }
  },
  getMonthStats: async function (dispatch) {
    dispatch(beginFetchingActivities());
    try {
      const epoch = getLast3Months();
      console.log(epoch);
      const { data } = await axiosStrava.get(
        `/athlete/activities?after=${epoch}`
      );
      const cleansedData = cleanseMyData(data);
      const stats = produceStats(cleansedData);
      dispatch(successFetchingStats(stats));
      console.log(data, "DATTA Q VUELVE DE AXIOS");
      return data;
    } catch (error) {
      //armar el ERROR HANDLER p/Axios
      errorHandler(dispatch, error, "getMONTH STATS");
    }
  },
};

function getLast3Months() {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  var d = new Date(year, month);
  d.setMonth(d.getMonth() - 2);
  //STRAVA TOMA SEGUNDOS, NO MILISEGUNDOS
  return d.getTime() / 1000;
}

function cleanseMyData(data) {
  return data.map((i) => {
    const {
      distance,
      name,
      elapsed_time,
      start_date_local,
      total_elevation_gain,
      id,
    } = i;
    return {
      distance,
      name,
      elapsed_time,
      start_date_local,
      total_elevation_gain,
      id,
    };
  });
}
function produceStats(data) {
  const finalProduct = data.reduce((total, act) => {
    const { distance, elapsed_time, total_elevation_gain, id } = act;
    const year = new Date(act.start_date_local).getFullYear();
    const month = new Date(act.start_date_local).toLocaleString("en", {
      month: "long",
    });
    if (total[month] === undefined) {
      total[month] = {
        distance,
        total_elevation_gain,
        id,
        elapsed_time,
        totalAct: 1,
        year,
      };
    } else {
      total[month].distance += distance;
      total[month].elapsed_time += elapsed_time;
      total[month].total_elevation_gain += total_elevation_gain;
      total[month].totalAct++;
    }
    return total;
  }, {});
  return Object.entries(finalProduct);
}
