(function () {
  "use strict";

  // Date issued
  flatpickr("#invoice-date-issued", {});

  document.querySelector(".invoice-add-item").onclick = () => {
    let element = `<tr class="invoice-list">
            <td><input class="form-control" placeholder="" type="text" value=""></td>
            <td><textarea rows="1" class="form-control"></textarea></td>
            <td><input class="form-control" placeholder="" type="text" value=""></td>
            <td><input class="form-control" placeholder="" type="text" value=""></td>
            <td><input class="form-control" placeholder="" type="text" value=""></td>
        </tr>`;

    document.querySelector(".invoice-body").innerHTML += element;
  };
})();
