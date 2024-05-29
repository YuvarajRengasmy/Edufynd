// for testimonials
var swiper = new Swiper(".news-swiper", {
  slidesPerView: 1,
  loop: true,
  freeMode: true,
  autoplay: {
    delay: 500,
    disableOnInteraction: false,
  },
  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
});

/*----CryptoChart----*/
var ctx = document.getElementById("CryptoChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    type: "line",
    datasets: [
      {
        data: [83, 56, 89, 73, 61, 75, 86, 56],
        label: "Bitcon",
        backgroundColor: "rgb(249, 162, 60,0.06)",
        borderColor: "rgba(249, 162, 60,0.8)",
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
/*----End CrptoChart----*/

/*----CryptoChart1----*/
var ctx = document.getElementById("CryptoChart1");
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
        borderColor: "rgba(68, 84, 195,0.8)",
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
/*----End CrptoChart1----*/
function cryptoChart1() {
  (myChart1.data.datasets[0] = {
    data: [45, 78, 67, 78, 36, 78, 89, 84],
    label: "Nem",
    backgroundColor: "rgba(" + myVarVal + ",0.06)",
    borderColor: "rgba(" + myVarVal + ",0.8)",
    fill: true,
    borderWidth: "3",
    pointBorderColor: "transparent",
    pointBackgroundColor: "transparent",
    lineTension: 0.3,
  }),
    myChart1.update();
}

/*----CryptoChart2----*/
var ctx = document.getElementById("CryptoChart2");
var myChart2 = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    type: "line",
    datasets: [
      {
        data: [56, 78, 36, 78, 29, 78, 37, 56],
        label: "Ripple",
        backgroundColor: "rgb(70, 212, 151,0.06)",
        borderColor: "rgba(70, 212, 151,0.8)",
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
/*----End CrptoChart2----*/

/*----CryptoChart3----*/
var ctx = document.getElementById("CryptoChart3");
var myChart3 = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    type: "line",
    datasets: [
      {
        data: [45, 78, 98, 34, 67, 28, 89, 45],
        label: "Neo",
        backgroundColor: "rgb(248, 70, 120,0.06)",
        borderColor: "rgba(248, 70, 120,0.8)",
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
/*----End CrptoChart3----*/

var options = {
  series: [
    {
      name: "Last Price $",
      data: [254, 678, 346, 789, 452, 389, 576, 689, 937, 457, 782, 827],
    },
    {
      name: "Daily Change $",
      data: [154, 578, 226, 589, 252, 189, 376, 289, 637, 257, 582, 727],
    },
  ],
  chart: {
    height: 280,
    type: "line",
    toolbar: {
      show: false,
    },
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
    show: false,
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
document.getElementById("cryptotrading").innerHTML = "";
var chart = new ApexCharts(document.querySelector("#cryptotrading"), options);
chart.render();
function cryptotrading() {
  chart.updateOptions({
    colors: ["rgb(" + myVarVal + ")", "rgba(247,45,102)"],
  });
}

var transScroll = document.getElementById("transaction-scroll");
new SimpleBar(transScroll, { autoHide: true });