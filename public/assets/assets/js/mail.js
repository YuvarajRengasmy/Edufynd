(function () {
  "use strict";

  let checkAll = document.querySelector(".check-all");
  checkAll.addEventListener("click", checkAllFn);

  function checkAllFn() {
    if (checkAll.checked) {
      document.querySelectorAll(".mail-checkbox input").forEach(function (e) {
        e.closest(".mail-list").classList.add("selected");
        e.checked = true;
      });
    } else {
      document.querySelectorAll(".mail-checkbox input").forEach(function (e) {
        e.closest(".mail-list").classList.remove("selected");
        e.checked = false;
      });
    }
  }

  /* mail editor */
  var toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["image", "video"],
    ["clean"], // remove formatting button
  ];

  var quill1 = new Quill("#mail-compose-editor", {
    modules: {
      toolbar: toolbarOptions,
    },
    theme: "snow",
  });

  /* to choices js */
  const multipleCancelButton = new Choices("#toMail", {
    allowHTML: true,
    removeItemButton: true,
  });

})();
