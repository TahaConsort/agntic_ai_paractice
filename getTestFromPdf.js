import fs from "fs";
import pdf from "pdf-parse-fork";

export const getPdfText = async () => {
  const pdfBuffer = fs.readFileSync("./temp.pdf");
  const data = await pdf(pdfBuffer);

  return data.text;
};