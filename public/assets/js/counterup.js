

function increment() {
  if (running == 1) {
    setTimeout(function () {
      Dtime++;
      var hours = Math.floor(Dtime / 10 / 3600);
      if (hours <= 9) {
        hours = "0" + hours;
      }
      var mins = Math.floor(Dtime / 10 / 60);
      if (mins <= 9) {
        mins = "0" + mins;
      }
      var secs = Math.floor(Dtime / 10);
      if (secs <= 9) {
        secs = "0" + secs;
      }
      document.getElementById("outputt").innerHTML =
        "00" + ":" + mins + ":" + secs;
      increment();
    }, 100);
  }
}

var Dtime = 0;
var running = 1;
increment();

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(0);
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 20 ? "00" + seconds : seconds;

    display.textContent = "00" + ":" + minutes + ":" + seconds;

    if (--timer < 20) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 5,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

function updateTimer() {
  // Get the current date
  var currentDate = new Date();

  // Set the year to 2025
  var future = new Date("Dec 19, 2025 11:30:00");

  // Update the year to the current year
  future.setFullYear(currentDate.getFullYear());

  // Output the updated date
  now = new Date();
  diff = future - now;

  days = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours = Math.floor(diff / (1000 * 60 * 60));
  mins = Math.floor(diff / (1000 * 60));
  secs = Math.floor(diff / 1000);

  d = days;
  h = hours - days * 24;
  m = mins - hours * 60;
  s = secs - mins * 60;

  document.getElementById("timer-outputpattern").innerHTML =
    '<span class="">' +
    d +
    "Days </span>" +
    '<span class="">' +
    h +
    "Hours </span>" +
    '<span class="">' +
    m +
    "Minutes </span>" +
    '<span class="">' +
    s +
    "Seconds </span>";
}
setInterval("updateTimer()", 1000);

let counter = document.querySelectorAll(".counter");
let arr = Array.from(counter);

arr.map((item) => {
  let count = item.innerHTML;
  item.innerHTML = 0;
  let counterValue = 0.5;

  function counterUP() {
    item.innerHTML = counterValue++;

    if (counterValue > count) {
      clearInterval(counting);
    }
  }

  let counting = setInterval(() => {
    counterUP();
  }, item.dataset.speed / count);
});



function countdown() {
  var seconds = 59;
  function tick() {
    var counter = document.getElementById("counter");
    seconds--;
    counter.innerHTML =
      "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      document.getElementById("verifiBtn").innerHTML = `
          <div class="Btn" id="ResendBtn">
              <button type="submit">Resend</button>
          </div>
      `;
      document.getElementById("counter").innerHTML = "";
    }
  }
  tick();
}
countdown();

function updateTimer2() {
  future = Date.parse("Dec 19, 2023 11:30:00");
  now = new Date();
  diff = future - now;

  days = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours = Math.floor(diff / (1000 * 60 * 60));
  mins = Math.floor(diff / (1000 * 60));
  secs = Math.floor(diff / 1000);

  d = days;
  h = hours - days * 24;
  m = mins - hours * 60;
  s = secs - mins * 60;

  document.getElementById("timer2")
      .innerHTML =
      '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-3"><div class="countdown mb-4 mb-xxl-0"><span class="">' + d + '</span><span class="ms-2">DAYS</span></div></div>' +
      '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-3"><div class="countdown mb-4 mb-xxl-0"><span class="">' + h + '</span><span class="ms-2">HOURS</span></div></div>' +
      '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-3"><div class="countdown mb-4 mb-xxl-0"><span class="">' + m + '</span><span class="ms-2">MINUTES</span></div></div>' +
      '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-3"><div class="countdown mb-4 mb-xxl-0"><span class="">' + s + '</span><span class="ms-2">SECONDS</span></div></div>'
}
setInterval('updateTimer2()', 100);