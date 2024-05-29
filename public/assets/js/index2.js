/* Target Incomplete Chart */
var options = {
  chart: {
    height: 225,
    type: "radialBar",
  },
  series: [85],
  colors: ["#4454c3"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "65%",
      },
      dataLabels: {
        name: {
          offsetY: 30,
          show: true,
        },
        value: {
          offsetY: -15,
          show: true,
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Goal"],
};
document.querySelector("#chart-circle-primary").innerHTML = "";
var chart = new ApexCharts(
  document.querySelector("#chart-circle-primary"),
  options
);
chart.render();

function Goal() {
  chart.updateOptions({
    colors: ["rgb(" + myVarVal + ")"],
  });
}
/* Target Incomplete Chart */

/* Myfirstcahrt Chart */
var options = {
  series: [
    {
      name: "Page views",
      type: "column",
      data: [
        1453, 3425, 7654, 3245, 4532, 5643, 7635, 5465, 6754, 5432, 5435, 6545,
      ],
    },
    {
      name: "New Visitors",
      type: "column",
      data: [
        1123, 2435, 5463, 1245, 3245, 4534, 5435, 3452, 5432, 3452, 2564, 3456,
      ],
    },
  ],
  chart: {
    toolbar: {
      show: false,
    },
    height: 310,
    type: "line",
    stacked: false,
    fontFamily: "roboto, sans-serif",
  },
  grid: {
    stroke: 1,
    borderColor: "rgba(67, 87, 133, .09)",
    color: "rgba(67, 87, 133, .09)",
    strokeDashArray: 0,
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: undefined,
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisLine: {
      lineStyle: {
        color: "rgba(67, 87, 133, .09)",
      },
    },
    axisTicks: {
      show: true,
      color: "rgba(67, 87, 133, .09)",
    },
    axisBorder: {
      show: false,
      color: "rgba(67, 87, 133, .09)",
    },
    labels: {
      style: {
        colors: "rgba(67, 87, 133, .09)",
      },
    },
  },
  yaxis: [
    {
      show: true,
      axisLine: {
        lineStyle: {
          color: "rgba(67, 87, 133, .09)",
        },
      },
      axisTicks: {
        show: true,
        color: "rgba(67, 87, 133, .09)",
      },
      axisBorder: {
        show: false,
        color: "rgba(67, 87, 133, .09)",
      },
      labels: {
        style: {
          colors: "rgba(67, 87, 133, .09)",
        },
      },
      title: {
        text: undefined,
      },
      tooltip: {
        enabled: true,
      },
    },
  ],
  tooltip: {
    enabled: true,
  },
  legend: {
    show: true,
    position: "bottom",
    offsetX: 50,
    offsetY: 5,
    fontSize: "13px",
    fontWeight: "normal",
    labels: {
      colors: "rgba(67, 87, 133, .09)",
    },
    markers: {
      width: 10,
      height: 10,
    },
  },
  stroke: {
    width: [2, 2],
    dashArray: [0, 0],
  },
  plotOptions: {
    bar: {
      endingShape: 'rounded',
      columnWidth: "35%",
      horizontal: false,
    },
  },
  colors: ["#4454c3", "#f72d66"],
};
document.querySelector("#myfirstchart").innerHTML = " ";
var chart1 = new ApexCharts(document.querySelector("#myfirstchart"), options);
chart1.render();
function myfirstchart() {
  chart1.updateOptions({
    colors: ["rgb(" + myVarVal + ")", "#f72d66"],
  });
}
/* Myfirstcahrt Chart */

/* canvasDoughnut Chart */
Chart.defaults.datasets.doughnut.cutout = "65%";
const data3 = {
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#2dce89", "#4454c3", "#ff5b51"],
      hoverOffset: 4,
    },
  ],
};
const config4 = {
  type: "doughnut",
  data: data3,
};
const myChart3 = new Chart(document.getElementById("canvasDoughnut"), config4);
/* canvasDoughnut Chart */

function index2() {
  myChart3.data.datasets[0] = {
    label: "My First Dataset",
    data: [300, 50, 100],
    backgroundColor: ["#2dce89", `rgb(${myVarVal})`, "#ff5b51"],
    hoverOffset: 4,
  };
  myChart3.update();
}
