import { secondsToHms } from "../utils/timeFunctions";

export const SingleActivity = ({
  distance,
  name,
  elapsed_time,
  start_date,
  total_elevation_gain,
}) => {
  return (
    <div className="activityItem">
      <h2>{name}</h2>
      <div className="date div">
        Date: {new Date(start_date).toLocaleDateString()}
      </div>
      <div className="duracion div">Duration: {secondsToHms(elapsed_time)}</div>
      <div className="distance div">Distance: {distance / 1000} km</div>
      <div className="elevation div">Elevation: {total_elevation_gain} mts</div>
    </div>
  );
};
