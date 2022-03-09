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
  return (
    <section id="monthlyStats">
      <h1>MonthlyStats</h1>
      <div className="activitiesContainer">
        {error && <div className="notification error">{error}</div>}
        {error || loading ? undefined : stats.length > 0 ? (
          stats.map((i) => {
            return <SingleStat month={i[0]} {...i[1]} key={i[1].id} />;
          })
        ) : (
          <h2>No stats to show in the past 3 months.</h2>
        )}
        {loading && <h2>Loading...</h2>}
      </div>
      <div className="linksContainer">
        <Link to="/">Back to Activities</Link>
      </div>
    </section>
  );
};
