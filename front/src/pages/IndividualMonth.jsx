import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { stravaAPI } from "../API/activitiesAPI";
import { SingleActivity } from "../components/SingleActivity";

export const IndividualMonth = () => {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(
    (state) => state.activities
  );
  const { month, year } = useParams();
  useEffect(() => {
    stravaAPI.getActivitiesPerMonth(dispatch, year, month);
  }, [dispatch, year, month]);

  return (
    <section id="activitiesSection">
      <h1>
        Activities on {month} of {year}
      </h1>
      <div className="activitiesContainer">
        {error && <div className="notification error">{error}</div>}
        {error || loading ? undefined : activities.length > 0 ? (
          activities.map((i) => <SingleActivity {...i} key={i.id} />)
        ) : (
          <h2>No activities on {month}.</h2>
        )}
        {loading && <h2>Loading...</h2>}
      </div>
      <div className="linksContainer">
        <Link to="/stats">Monthly stats</Link>
        <Link to="/">Recent activities</Link>
      </div>
    </section>
  );
};
