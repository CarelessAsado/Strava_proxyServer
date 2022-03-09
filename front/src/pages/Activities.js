import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { stravaAPI } from "../API/activitiesAPI";

import { SingleActivity } from "../components/SingleActivity";

export const Activities = () => {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(
    (state) => state.activities
  );
  useEffect(() => {
    console.log("segundooo");
    stravaAPI.getActivities(dispatch);
  }, [dispatch]);
  return (
    <section id="activitiesSection">
      <h1>Recent activities</h1>

      <div className="activitiesContainer">
        {error && <div className="notification error">{error}</div>}
        {error || loading ? undefined : activities.length > 0 ? (
          activities.map((i) => <SingleActivity {...i} key={i.id} />)
        ) : (
          <h2>No activities in the past month.</h2>
        )}
        {loading && <h2>Loading...</h2>}
      </div>
      <div className="linksContainer">
        <Link to="/stats">Monthly stats</Link>
      </div>
    </section>
  );
};
