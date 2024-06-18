import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
  TimesNewRoman: {
    normal:
      "https://cdn.jsdelivr.net/gh/upturntech/timesnewroman/times_new_roman.ttf",
    bold: "https://cdn.jsdelivr.net/gh/upturntech/timesnewroman/times_new_roman_bold.ttf",
    italics:
      "https://cdn.jsdelivr.net/gh/upturntech/timesnewroman/times_new_roman_italic.ttf",
    bolditalics:
      "https://cdn.jsdelivr.net/gh/upturntech/timesnewroman/times_new_roman_bold_italic.ttf",
  },
};

export const templatePdf = (pdfhead, tablebody, paperSize) => {
  var dd = {
    pageSize: "A4",
    pageOrientation: paperSize,
    defaultStyle: {
      font: "TimesNewRoman",
    },
    content: [
      {
        text: pdfhead,
        alignment: "center",
        fontSize: 18,
        style: "header",
        margin: [0, 0, 0, 10],
      },
      {
        margin: [0, 10, 0, 0],
        table: {
          body: tablebody,
        },
      },
    ],
  };

  var win = window.open("", "_blank");
  pdfMake.createPdf(dd).open({}, win);
  return true;
};
