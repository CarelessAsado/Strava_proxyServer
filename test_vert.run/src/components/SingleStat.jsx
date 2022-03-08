import { Link } from "react-router-dom";

export const SingleStat = ({
  distance,
  elapsed_time,
  year,
  total_elevation_gain,
  month,
}) => {
  return (
    <div className="statItem">
      <Link to={`/stats/${year}/${month}`}>
        <h2>
          {month}/{year}
        </h2>
        <div className="duracion div">Duration: {elapsed_time}</div>
        <div className="distance div">Distance: {distance / 1000} km</div>
        <div className="elevation div">
          Elevation: {total_elevation_gain} mts
        </div>
      </Link>
    </div>
  );
};
