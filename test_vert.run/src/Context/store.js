import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./activitiesSlice";

export default configureStore({
  reducer: {
    activities: activitiesReducer,
  },
});
