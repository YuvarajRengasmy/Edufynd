document.querySelector(".chart-container").innerHTML =
  '<canvas id="expense" class="overflow-hidden"></canvas>';
var ctx = document.getElementById("expense");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [13, 26, 20, 93, 61, 140, 85, 96],
        label: "Expenses",
        backgroundColor: "rgba(68,84,195,0.06)",
        borderColor: "rgba(68,84,195,0.8)",
        fill: true,
        borderWidth: 3,
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        lineTension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          display: false,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  },
});
function expense() {
  "use strict";

  myChart.data.datasets[0] = {
    data: [13, 26, 20, 93, 61, 140, 85, 96],
    label: "Expenses",
    backgroundColor: `rgba(${myVarVal},0.06)`,
    borderColor: `rgba(${myVarVal},0.8)`,
    fill: true,
    borderWidth: "3",
    pointBorderColor: "transparent",
    pointBackgroundColor: "transparent",
    lineTension: 0.3,
  };
  myChart.update();
}

var options = {
  series: [
    {
      name: "Project Budget",
      data: [
        7635, 5465, 6754, 5432, 5435, 6545, 4453, 3425, 7654, 3245, 4532, 5643,
      ],
    },
    {
      name: "Expenses",
      data: [
        5435, 3452, 5432, 3452, 2564, 3456, 3123, 2435, 5463, 1245, 3245, 4534,
      ],
    },
  ],
  chart: {
    height: 325,
    type: "line",
    zoom: {
      enabled: false,
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 5,
      left: 0,
      blur: 3,
      color: "#000",
      opacity: 0.1,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    enabled: false,
    position: "top",
    horizontalAlign: "center",
    offsetX: -15,
    fontWeight: "bold",
  },
  stroke: {
    curve: "smooth",
    width: "3",
  },
  grid: {
    borderColor: "rgba(67, 87, 133, .09)",
  },
  colors: ["rgb(68,84,195)", "rgb(247,45,102)"],
  yaxis: {
    title: {
      style: {
        color: "#adb5be",
        fontSize: "14px",
        fontFamily: "poppins, sans-serif",
        fontWeight: 600,
        cssClass: "apexcharts-yaxis-label",
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
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: true,
      color: "rgba(67, 87, 133, .09)",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "rgba(67, 87, 133, .09)",
      width: 6,
      offsetX: 0,
      offsetY: 0,
    },
    labels: {
      rotate: -90,
    },
  },
};
document.getElementById("projectInvestment").innerHTML = "";
var chart = new ApexCharts(
  document.querySelector("#projectInvestment"),
  options
);
chart.render();
function projectInvestment() {
  chart.updateOptions({
    colors: ["rgb(" + myVarVal + ")", "rgba(247,45,102)"],
  });
}

/* doughnut chart */
Chart.defaults.datasets.doughnut.cutout = "65%";

const data3 = {
  datasets: [
    {
      data: [68, 55, 45],
      backgroundColor: ["rgb(247,45,102)", "rgb(68,84,195)", "rgb(45,206,137)"],
      borderColor: ["rgb(247,45,102)", "rgb(68,84,195)", "rgb(45,206,137)"],
    },
  ],
};
var option4 = {
  responsive: true,
};
const config4 = {
  type: "doughnut",
  data: data3,
};
const myChart1 = new Chart(
  document.getElementById("Statistics"),
  config4,
  option4
);
function index3() {
  myChart1.data.datasets[0] = {
    data: [68, 55, 45],
    backgroundColor: ["rgb(247,45,102)", `rgb(${myVarVal})`, "rgb(45,206,137)"],
    borderColor: ["rgb(247,45,102)", `rgb(${myVarVal})`, "rgb(45,206,137)"],
  };
  myChart1.update();
}

var activityScroll = document.getElementById("activity-scrollbar");
new SimpleBar(activityScroll, { autoHide: true });

var notifyScroll = document.getElementById("notify-scroll");
new SimpleBar(notifyScroll, { autoHide: true });
