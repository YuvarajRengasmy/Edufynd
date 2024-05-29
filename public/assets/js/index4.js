/* Start Application */
var options = {
  chart: {
    height: 170,
    width: 170,
    type: "radialBar",
  },

  series: [85],
  colors: ["#4454c3"],
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
          offsetY: 10,
          offsetX: 10,
          color: "#4b9bfa",
          fontSize: "1.25rem",
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
document.querySelector("#application").innerHTML = "";
var chart1 = new ApexCharts(
  document.querySelector("#application"),
  options
);
chart1.render();


function chartApplication() {
  chart1.updateOptions({
    colors: ["rgb(" + myVarVal + ")"],
  });
}
/* End Application */

/* Start Shortlisted */
var options = {
  chart: {
    height: 170,
    width: 170,
    type: "radialBar",
  },

  series: [60],
  colors: ["#2dce89"],
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
          offsetY: 10,
          offsetX: 10,
          color: "#4b9bfa",
          fontSize: "1.25rem",
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
document.querySelector("#chart-circle-primary2").innerHTML = "";
var chart2 = new ApexCharts(
  document.querySelector("#chart-circle-primary2"),
  options
);
chart2.render();

/* End Shortlisted */

/* Start Rejected */
var options = {
  chart: {
    height: 170,
    width: 170,
    type: "radialBar",
  },
  series: [45],
  colors: ["#f7346b"],
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
          offsetY: 10,
          offsetX: 10,
          color: "#4b9bfa",
          fontSize: "1.25rem",
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
document.querySelector("#chart-circle-primary3").innerHTML = "";
var chart3 = new ApexCharts(
  document.querySelector("#chart-circle-primary3"),
  options
);
chart3.render();

/* End Rejected */

/*  sales overview chart */
var options = {
  series: [
    {
      name: "Project In'",
      data: [
        1453, 3425, 7654, 3245, 4532, 5643, 7635, 5465, 6754, 5432, 5435, 6545,
      ],
    },
    {
      name: "Project take",
      data: [
        1123, 2435, 5463, 1245, 3245, 4534, 5435, 3452, 5432, 3452, 2564, 3456,
      ],
    },
    {
      name: "On Hold",
      data: [
        1123, 2435, 5463, 1245, 3245, 4534, 5435, 3452, 5432, 3452, 2564, 3456,
      ],
    },
  ],
  chart: {
    stacked: true,
    type: "bar",
    height: 310,
    toolbar: {
      show: false,
    },
  },
  grid: {
    borderColor: "rgba(67, 87, 133, .09)",
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true, // Ensure y-axis grids are shown
      },
    },
  },
  colors: ["#4454c3", "#f72d66", "#cedbfd"],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      colors: {
        ranges: [
          {
            from: -100,
            to: -46,
            color: "#ebeff5",
          },
          {
            from: -45,
            to: 0,
            color: "#ebeff5",
          },
        ],
      },
      columnWidth: "20%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
    position: "top",
  },
  yaxis: {
    axisBorder: {
      show: true,
      color: "rgba(67, 87, 133, 0.05)",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "rgba(67, 87, 133, 0.05)",
      width: 6,
      offsetX: 0,
      offsetY: 0,
    },
    labels: {
      show: true,
      formatter: function (y) {
        return y.toFixed(0) + "";
      },
    },
  },
  xaxis: {
    type: "month",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],
    axisBorder: {
      show: false,
      color: "rgba(67, 87, 133, 0.05)",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: false,
      borderType: "solid",
      color: "rgba(67, 87, 133, 0.05)",
      width: 6,
      offsetX: 0,
      offsetY: 0,
    },
    labels: {
      rotate: -90,
    },
  },
};
document.getElementById("projectTracked").innerHTML = "";
var chart4 = new ApexCharts(document.querySelector("#projectTracked"), options);
chart4.render();
function projectTracked() {
  chart4.updateOptions({
    colors: ["rgb(" + myVarVal + ")", "#f72d66", "rgb(232,235,242)"],
  });
}
/*  sales overview chart */

/* doughnut chart */
Chart.defaults.datasets.doughnut.cutout = "70%";
const data3 = {
  labels: ["Application", "Shortlisted", "Rejected", "On Hold", "Finalised"],
  datasets: [
    {
      data: [68, 55, 45, 34, 27],
      backgroundColor: [
        "#4454c3",
        "#f72d66",
        "#2dce89",
        "#45aaf2",
        "#ecb403",
        "#ff5b51",
      ],
      hoverBackgroundColor: [
        "#4454c3",
        "#f72d66",
        "#2dce89",
        "#45aaf2",
        "#ecb403",
        "#ff5b51",
      ],
    },
  ],
};
const config4 = {
  type: "doughnut",
  data: data3,
  options: {
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  },
};
const myChart1 = new Chart(document.getElementById("Projects"), config4);
function index4() {
  myChart1.data.datasets[0] = {
    data: [68, 55, 45, 34, 27],
    backgroundColor: [
      `rgb(${myVarVal})`,
      "#f72d66",
      "#2dce89",
      "#45aaf2",
      "#ecb403",
      "#ff5b51",
    ],
    hoverBackgroundColor: [
      `rgb(${myVarVal})`,
      "#f72d66",
      "#2dce89",
      "#45aaf2",
      "#ecb403",
      "#ff5b51",
    ],
  };
  myChart1.update();
}
