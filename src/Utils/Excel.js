import React from "react";

export class ExportCsvService extends React.Component {
  static downloadCsv = (
    data,
    filename,
    header,
    orginalHeaderList,
    viewHeaderList
  ) => {
    let csvData = this.ConvertToCSV(
      data,
      header,
      orginalHeaderList,
      viewHeaderList
    );
    let blob = new Blob(["\ufeff" + csvData], {
      type: "text/csv;charset=utf-8;",
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  };

  static ConvertToCSV = (
    objArray,
    header,
    orginalHeaderList,
    viewHeaderList
  ) => {
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = `\n ${header} \n,\n`;
    let row = "S.No,";
    for (let index in viewHeaderList) {
      row += viewHeaderList[index] + ",";
    }
    row = row.slice(0, -1);
    str += row + "\n";
    for (let i = 0; i < array.length; i++) {
      let line = i + 1 + "";
      for (let index in orginalHeaderList) {
        let head = orginalHeaderList[index];
        line += "," + array[i][head];
      }
      str += line + "\r\n";
    }
    return str;
  };
}
