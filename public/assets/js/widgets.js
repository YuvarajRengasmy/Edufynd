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
document.querySelector("#chart-circle-primary1").innerHTML = "";
var chart1 = new ApexCharts(
  document.querySelector("#chart-circle-primary1"),
  options
);
chart1.render();

function widget1() {
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

//Spark11
var spark11 = {
  chart: {
    type: "area",
    height: 60,
    width: 160,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  fill: {
    gradient: {
      enabled: false,
    },
  },
  series: [
    {
      name: "Total Revenue",
      data: [
        0, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53,
        61, 27, 54, 43, 19, 46,
      ],
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ["#4454c3"],
};
var spark11 = new ApexCharts(document.querySelector("#spark11"), spark11);
spark11.render();
function widget2() {
  spark11.updateOptions({
    colors: ["rgb(" + myVarVal + ")"],
  });
}
//Spark11

//Spark2
var spark2 = {
  chart: {
    type: "area",
    height: 60,
    width: 160,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  fill: {
    gradient: {
      enabled: false,
    },
  },
  series: [
    {
      name: "Unique Visitors",
      data: [
        0, 45, 93, 53, 61, 27, 54, 43, 19, 46, 54, 38, 56, 24, 65, 31, 37, 39,
        62, 51, 35, 41, 35, 27,
      ],
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ["#2dce89"],
};
var spark2 = new ApexCharts(document.querySelector("#spark2"), spark2);
spark2.render();

//Spark2

//Spark3
var spark3 = {
  chart: {
    type: "area",
    height: 60,
    width: 160,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  fill: {
    gradient: {
      enabled: false,
    },
  },
  series: [
    {
      name: "Expenses",
      data: [
        0, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 45, 54, 38, 56, 24,
        65, 31, 37, 39, 62, 51,
      ],
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ["#ff5b51"],
};
var spark3 = new ApexCharts(document.querySelector("#spark3"), spark3);
spark3.render();
//Spark3

//sparkline_bar11
var sparkbar1 = {
  chart: {
    type: "bar",
    height: 50,
    barWidth: 5,
    barSpacing: 7,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: false,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  fill: {
    gradient: {
      enabled: false,
    },
  },
  series: [
    {
      name: "Total Revenue",
      data: [
        2, 4, 3, 4, 5, 4, 5, 3, 4, 5, 2, 4, 5, 4, 3, 5, 4, 3, 4, 5, 4, 5, 4, 3,
        5, 4, 3, 4, 5,
      ],
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ["#4454c3"],
};
var sparkbar1 = new ApexCharts(
  document.querySelector("#sparkline_bar11"),
  sparkbar1
);
sparkbar1.render();
function widget3() {
  sparkbar1.updateOptions({
    colors: ["rgb(" + myVarVal + ")"],
  });
}
//sparkline_bar11

//sparkline_bar12
var sparkbar2 = {
  chart: {
    type: "bar",
    height: 50,
    barWidth: 5,
    barSpacing: 7,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: false,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  fill: {
    gradient: {
      enabled: false,
    },
  },
  series: [
    {
      name: "Total Revenue",
      data: [
        3, 5, 4, 4, 5, 4, 5, 3, 4, 5, 3, 4, 5, 4, 3, 5, 4, 3, 4, 5, 4, 5, 4, 3,
        5, 4, 3, 4, 5,
      ],
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ["#f7346b"],
};
var sparkbar2 = new ApexCharts(
  document.querySelector("#sparkline_bar12"),
  sparkbar2
);
sparkbar2.render();
//sparkline_bar12

//sparkline_bar13
var sparkbar3 = {
  chart: {
    type: "bar",
    height: 50,
    barWidth: 5,
    barSpacing: 7,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: false,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  fill: {
    gradient: {
      enabled: false,
    },
  },
  series: [
    {
      name: "Total Revenue",
      data: [
        3, 5, 4, 4, 5, 4, 5, 3, 4, 5, 3, 4, 5, 4, 3, 5, 4, 3, 4, 5, 4, 5, 4, 3,
        5, 4, 3, 4, 5,
      ],
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ["#2dce89"],
};
var sparkbar3 = new ApexCharts(
  document.querySelector("#sparkline_bar13"),
  sparkbar3
);
sparkbar3.render();
//sparkline_bar13

//sparkline_bar14
var sparkbar4 = {
  chart: {
    type: "bar",
    height: 50,
    barWidth: 5,
    barSpacing: 7,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: false,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  fill: {
    gradient: {
      enabled: false,
    },
  },
  series: [
    {
      name: "Total Revenue",
      data: [
        3, 5, 4, 4, 5, 4, 5, 3, 4, 5, 3, 4, 5, 4, 3, 5, 4, 3, 4, 5, 4, 5, 4, 3,
        5, 4, 3, 4, 5,
      ],
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ["#45aaf2"],
};
var sparkbar4 = new ApexCharts(
  document.querySelector("#sparkline_bar14"),
  sparkbar4
);
sparkbar4.render();
//sparkline_bar13

/*----CryptoChart----*/
var ctx = document.getElementById("widget-CryptoChart");
var myChart2 = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    type: "line",
    datasets: [
      {
        data: [83, 56, 89, 73, 61, 75, 86, 56],
        label: "Bitcon",
        backgroundColor: "rgb(68, 84, 195,0.06)",
        borderColor: "rgba(68, 84, 195,0.6)",
        fill: true,
        borderWidth: "3",
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
function widget4() {
  myChart2.data.datasets[0] = {
    data: [83, 56, 89, 73, 61, 75, 86, 56],
    label: "Bitcon",
    backgroundColor: `rgb(${myVarVal},0.06)`,
    borderColor: `rgb(${myVarVal},0.6)`,
    fill: true,
    borderWidth: "3",
    pointBorderColor: "transparent",
    pointBackgroundColor: "transparent",
    lineTension: 0.3,
  };
  myChart2.update();
}
/*----End CrptoChart----*/

/*----CryptoChart11----*/
var ctx = document.getElementById("widget-CryptoChart11");
var myChart1 = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    type: "line",
    datasets: [
      {
        data: [45, 78, 67, 78, 36, 78, 89, 84],
        label: "Nem",
        backgroundColor: "rgb(68, 84, 195,0.06)",
        borderColor: "rgba(68, 84, 195,0.6)",
        fill: true,
        borderWidth: "3",
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
function widget5() {
  myChart1.data.datasets[0] = {
    data: [45, 78, 67, 78, 36, 78, 89, 84],
    label: "Nem",
    backgroundColor: `rgb(${myVarVal},0.06)`,
    borderColor: `rgb(${myVarVal},0.6)`,
    fill: true,
    borderWidth: "3",
    pointBorderColor: "transparent",
    pointBackgroundColor: "transparent",
    lineTension: 0.3,
  };
  myChart1.update();
}
/*----En d CrptoChart1----*/

/*----CryptoChart2----*/
var ctx = document.getElementById("widget-CryptoChart2");
var myChart3 = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    type: "line",
    datasets: [
      {
        data: [56, 78, 36, 78, 29, 78, 37, 56],
        label: "Ripple",
        backgroundColor: "rgb(68, 84, 195,0.06)",
        borderColor: "rgba(68, 84, 195,0.6)",
        fill: true,
        borderWidth: "3",
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
function widget6() {
  myChart3.data.datasets[0] = {
    data: [56, 78, 36, 78, 29, 78, 37, 56],
    label: "Ripple",
    backgroundColor: `rgb(${myVarVal},0.06)`,
    borderColor: `rgb(${myVarVal},0.6)`,
    fill: true,
    borderWidth: "3",
    pointBorderColor: "transparent",
    pointBackgroundColor: "transparent",
    lineTension: 0.3,
  };
  myChart3.update();
}
/*----End CrptoChart2----*/

/*----CryptoChart3----*/
var ctx = document.getElementById("widget-CryptoChart3");
var myChart4 = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    type: "line",
    datasets: [
      {
        data: [45, 78, 98, 34, 67, 28, 89, 45],
        label: "Neo",
        backgroundColor: "rgb(68, 84, 195,0.06)",
        borderColor: "rgba(68, 84, 195,0.6)",
        fill: true,
        borderWidth: "3",
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
function widget7() {
  myChart4.data.datasets[0] = {
    data: [45, 78, 98, 34, 67, 28, 89, 45],
    label: "Neo",
    backgroundColor: `rgb(${myVarVal},0.06)`,
    borderColor: `rgb(${myVarVal},0.6)`,
    fill: true,
    borderWidth: "3",
    pointBorderColor: "transparent",
    pointBackgroundColor: "transparent",
    lineTension: 0.3,
  };
  myChart4.update();
}
/*----End CrptoChart3----*/
/* Start Shares */
var options = {
  chart: {
    height: 200,
    width: 200,
    type: "radialBar",
  },

  series: [65],
  colors: ["#4454c3"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "40%",
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
          show: false,
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Followers"],
};
document.querySelector("#shares").innerHTML = "";
var shares = new ApexCharts(document.querySelector("#shares"), options);
shares.render();

function widget8() {
  shares.updateOptions({
    colors: ["rgb(" + myVarVal + ")"],
  });
}
/* End Shares */

/* Start Projects */
var options = {
  chart: {
    height: 200,
    width: 200,
    type: "radialBar",
  },

  series: [60],
  colors: ["#f72d66"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "40%",
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
          show: false,
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Followers"],
};
document.querySelector("#projects").innerHTML = "";
var projects = new ApexCharts(document.querySelector("#projects"), options);
projects.render();

/* End Projects */
/* Start Users */
var options = {
  chart: {
    height: 200,
    width: 200,
    type: "radialBar",
  },

  series: [60],
  colors: ["#3fd294"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "40%",
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
          show: false,
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Followers"],
};
document.querySelector("#users").innerHTML = "";
var users = new ApexCharts(document.querySelector("#users"), options);
users.render();

/* End Users */