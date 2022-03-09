import { Link } from "react-router-dom";
import { secondsToHms } from "../utils/timeFunctions";

export const SingleStat = ({
  distance,
  elapsed_time,
  year,
  total_elevation_gain,
  month,
  totalAct,
}) => {
  return (
    <div className="statItem">
      <Link to={`/stats/${year}/${month}`}>
        <h2>
          {month}/{year}
        </h2>
        <div className="duracion div">
          Duration: {secondsToHms(elapsed_time)}
        </div>
        <div className="distance div">Distance: {distance / 1000} km</div>
        <div className="elevation div">
          Elevation: {total_elevation_gain} mts
        </div>
        <div className="totalActivities div">
          Number of activities: {totalAct}
        </div>
      </Link>
    </div>
  );
};
