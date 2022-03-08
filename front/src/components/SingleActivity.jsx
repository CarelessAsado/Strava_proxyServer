export const SingleActivity = ({
  distance,
  name,
  elapsed_time,
  start_date_local,
  total_elevation_gain,
}) => {
  return (
    <div className="activityItem">
      <h2>{name}</h2>
      <div className="date div">
        Date: {new Date(start_date_local).toLocaleDateString()}
      </div>
      <div className="duracion div">Duration: {elapsed_time}</div>
      <div className="distance div">Distance: {distance / 1000} km</div>
      <div className="elevation div">Elevation: {total_elevation_gain} mts</div>
    </div>
  );
};
