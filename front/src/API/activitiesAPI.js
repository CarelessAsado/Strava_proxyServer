import {
  beginFetchingActivities,
  successFetchingActivities,
  successFetchingStats,
} from "../Context/activitiesSlice";
import {
  cleanseMyData,
  produceStats,
  getLast3Months,
} from "../utils/timeFunctions";
import { errorHandler } from "./errorHandler";
import { axiosStrava } from "./models";

export const stravaAPI = {
  getUser: async function (dispatch) {
    try {
      const { data } = await axiosStrava.get();
      return data;
    } catch (error) {
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
      dispatch(successFetchingActivities(cleansedData));
      return data;
    } catch (error) {
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
      dispatch(successFetchingActivities(cleansedData));
      return data;
    } catch (error) {
      errorHandler(dispatch, error, "get PER MONTH ACTIVITIES");
    }
  },
  getMonthStats: async function (dispatch) {
    dispatch(beginFetchingActivities());
    try {
      const epoch = getLast3Months();
      const { data } = await axiosStrava.get(
        `/athlete/activities?after=${epoch}`
      );
      const cleansedData = cleanseMyData(data);
      const stats = produceStats(cleansedData);
      dispatch(successFetchingStats(stats));
      return data;
    } catch (error) {
      errorHandler(dispatch, error, "getMONTH STATS");
    }
  },
};
