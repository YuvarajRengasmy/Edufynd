
function updateTimer() {
    future = Date.parse("Dec 19, 2024 11:30:00");
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

    document.getElementById("timer").innerHTML =
    '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-6 col-12"><div class="under-maintenance-time rounded"><h2 class="fw-semibold mb-0 text-fixed-white">' + d + '</h2><p class="mb-1 fs-12 op-6">DAYS</p></div></div>' +
    '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-6 col-12"><div class="under-maintenance-time rounded"><h2 class="fw-semibold mb-0 text-fixed-white">' + h + '</h2><p class="mb-1 fs-12 op-6">HOURS</p></div></div>' +
    '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-6 col-12"><div class="under-maintenance-time rounded"><h2 class="fw-semibold mb-0 text-fixed-white">' + m + '</h2><p class="mb-1 fs-12 op-6">MINUTES</p></div></div>' +
    '<div class="col-xxl-3 col-xl-6 col-lg-6 col-md-3 col-sm-6 col-12"><div class="under-maintenance-time rounded"><h2 class="fw-semibold mb-0 text-fixed-white">' + s + '</h2><p class="mb-1 fs-12 op-6">SECONDS</p></div></div>'
}
setInterval('updateTimer()', 1000);