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
  /*-
Activities page
1. Retrieve a list of RECENT activities of a Strava user.
2. For each activity show 
  -name 
  -date (creo q es start_date_local/ ISO 8601 formatted date time)
  -distance (es en mts, no acepta float creo. poner en km??)
  -time  CREO Q ES elapsedtime ,creo q esta en seconds, segun la reference docs
  -elevation gain / total_elevation_gain.
*/
  return (
    <section id="activitiesSection">
      <h1>Recent activities</h1>

      <div className="activitiesContainer">
        {error && <div className="notification error">{error}</div>}
        {loading ? (
          <h1>Loading...</h1>
        ) : activities.length > 0 ? (
          activities.map((i) => <SingleActivity {...i} key={i.id} />)
        ) : (
          <h2>No activities in the past month.</h2>
        )}
      </div>
      <div className="linksContainer">
        <Link to="/stats">Monthly stats</Link>
      </div>
    </section>
  );
};
