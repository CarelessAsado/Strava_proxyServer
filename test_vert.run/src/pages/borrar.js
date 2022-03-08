const data = [
  {
    distance: 30000,
    name: "Play tennis",
    elapsed_time: 5820,
    start_date_local: "2022-01-12T14:50:00Z",
    total_elevation_gain: 0,
    id: 6793512836,
  },
  {
    distance: 12000,
    name: "Swimming",
    elapsed_time: 5427,
    start_date_local: "2022-02-07T13:30:00Z",
    total_elevation_gain: 0,
    id: 6790175408,
  },
  {
    distance: 11000,
    name: "Walk in the park",
    elapsed_time: 1800,
    start_date_local: "2022-02-08T15:30:00Z",
    total_elevation_gain: 10,
    id: 6790181304,
  },
  {
    distance: 5000,
    name: "Afternoon Run",
    elapsed_time: 0,
    start_date_local: "2022-03-07T15:20:00Z",
    total_elevation_gain: 10,
    id: 6788585919,
  },
  {
    distance: 10000,
    name: "Hiking in Cordoba",
    elapsed_time: 8400,
    start_date_local: "2022-03-08T00:20:00Z",
    total_elevation_gain: 130,
    id: 6790179122,
  },
  {
    distance: 20000,
    name: "Playing soccer",
    elapsed_time: 5400,
    start_date_local: "2022-03-08T20:00:00Z",
    total_elevation_gain: 0,
    id: 6790178124,
  },
];
const month = new Date().getMonth();
const x = new Date();
x.setMonth(new Date().getMonth() - 3);
console.log(x);
console.log(new Date("January", 0, 2022));
console.log(Date.parse("January" + "0" + 2022));

const str = "2022-02-07T13:30:00Z";
const dd = new Date(str);
console.log(dd);
console.log(month);
const year = new Date().getFullYear();
console.log(year);
console.log(new Date(year, month).getTime());

var d = new Date(year, month);
console.log(d.toLocaleDateString());
d.setMonth(d.getMonth() - 2);
console.log(d.getTime() / 1000);

const finalProduct = data.reduce((total, act) => {
  const { distance, elapsed_time, total_elevation_gain, id } = act;
  const year = new Date(act.start_date_local).getFullYear();
  const month = new Date(act.start_date_local).toLocaleString("en", {
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
console.log();
const arr = Object.entries(finalProduct);
arr.map((i) => {
  console.log(i[0]);
  console.log({ ...i[1] });
});
