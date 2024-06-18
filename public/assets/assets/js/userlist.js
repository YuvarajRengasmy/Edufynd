// Get the reference to your HTML table
const htmlTable = document.getElementById("userlist-table");

new gridjs.Grid({
    sort: true,
    pagination: {
      enabled: true,
      limit: 8, // Default entries per page
    },
    search: true,
    fixedHeader: false,
    className: {
      table: "table table-bordered text-nowrap w-100",
    },
    from: htmlTable,
}).render(document.getElementById("grid-container"));
