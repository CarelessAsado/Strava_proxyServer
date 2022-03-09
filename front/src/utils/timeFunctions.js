function secondsToHms(d) {
  if (d === 0) {
    return "0s";
  }
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + ":" : "";
  const mDisplay = m > 0 ? m + ":" : "00:";
  const sDisplay = s > 0 ? s : "00";
  return hDisplay + mDisplay + sDisplay;
}
function produceStats(data) {
  console.log(data.length, "ver q sean 7");
  const finalProduct = data.reduce((total, act) => {
    const { distance, elapsed_time, total_elevation_gain, id } = act;
    const year = new Date(act.start_date).getFullYear();
    const month = new Date(act.start_date).toLocaleString("en", {
      month: "long",
    });
    if (total[month] === undefined) {
      total[month] = {
        distance,
        total_elevation_gain,
        id,
        elapsed_time,
        totalAct: 1,
        year,
      };
    } else {
      total[month].distance += distance;
      total[month].elapsed_time += elapsed_time;
      total[month].total_elevation_gain += total_elevation_gain;
      total[month].totalAct++;
    }
    return total;
  }, {});
  return Object.entries(finalProduct);
}

function cleanseMyData(data) {
  return data.map((i) => {
    const {
      distance,
      name,
      elapsed_time,
      start_date,
      total_elevation_gain,
      id,
    } = i;
    return {
      distance,
      name,
      elapsed_time,
      start_date,
      total_elevation_gain,
      id,
    };
  });
}
function getLast3Months() {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  var d = new Date(year, month);
  d.setMonth(d.getMonth() - 2);
  //STRAVA TOMA SEGUNDOS, NO MILISEGUNDOS
  return d.getTime() / 1000;
}
export { secondsToHms, cleanseMyData, produceStats, getLast3Months };
