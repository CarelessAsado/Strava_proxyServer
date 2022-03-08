import { createSlice } from "@reduxjs/toolkit";

export const activitiesSlice = createSlice({
  name: "activities",
  initialState: { activities: [], loading: false, error: false, stats: [] },
  reducers: {
    beginFetchingActivities: (state) => {
      state.loading = true;
      state.error = false;
    },
    successFetchingActivities: (state, action) => {
      state.loading = false;
      state.activities = action.payload;
    },
    failureFetchingActivities: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    successFetchingStats: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    },
  },
});
export const {
  beginFetchingActivities,
  successFetchingActivities,
  failureFetchingActivities,
  successFetchingStats,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
