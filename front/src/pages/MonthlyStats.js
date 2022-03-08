import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { stravaAPI } from "../API/activitiesAPI";
import { SingleStat } from "../components/SingleStat";

export const MonthlyStats = () => {
  const { stats, loading, error } = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  useEffect(() => {
    stravaAPI.getMonthStats(dispatch);
  }, [dispatch]);
  console.log(stats);
  /*
    Monthly Stats page
1. On this page, for each of the past 3 months, show how much has the 
Strava user done in terms of distance, time and elevation gain 
(aggregated data for the activities of the month).
2. When the user clicks on a month, the application should move to a 
page that shows the activities of that month in the same format as the 
“Activities page”
*/
  return (
    <section id="monthlyStats">
      MonthlyStats
      <div className="activitiesContainer">
        {error && <div className="notification error">{error}</div>}
        {loading ? (
          <h1>Loading...</h1>
        ) : stats.length > 0 ? (
          stats.map((i) => {
            console.log(i[0]);
            return <SingleStat month={i[0]} {...i[1]} key={i[1].id} />;
          })
        ) : (
          <h2>No stats to show in the past 3 months.</h2>
        )}
      </div>
      <div className="linksContainer">
        <Link to="/">Back to Activities</Link>
      </div>
    </section>
  );
};
