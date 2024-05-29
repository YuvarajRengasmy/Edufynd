/* Start filemanager */
var options = {
  chart: {
    height: 100,
    width: 100,
    type: "radialBar",
    sparkline: {
      enabled: true,
    },
  },
  series: [85],
  colors: ["var(--primary-color)"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "50%",
        background: "#fff",
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 5,
          offsetX: 10,
          color: "#4b9bfa",
          fontSize: "1rem",
          show: true,
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Followers"],
};
document.querySelector("#filemanager").innerHTML = "";
var chart1 = new ApexCharts(document.querySelector("#filemanager"), options);
chart1.render();

/* End filemanager */
