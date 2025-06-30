import xlsx from "xlsx";
import { z } from "zod";

const rowSchema = z.object({
  enrolmentNumber: z
    .string({ message: "Enrolment number must be a string" })
    .regex(/^_?\d+$/, "Enrolment number must be numeric"),
  result: z
    .number({ message: "Result must be a number" })
    .positive({ message: "Result must be a positive integer" }),
  semester: z
    .number({ message: "Semester must be a number" })
    .int()
    .positive({ message: "Semester must be a positive integer" }),
});

const processExcelFile = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const numberOfSheets = workbook.SheetNames.length;
    const data = [];
    const expectedHeaders = ["enrolmentNumber", "semester", "result"];
    workbook.SheetNames.forEach((sheet_name) => {
      const worksheet = workbook.Sheets[sheet_name];

      const rawData = xlsx.utils.sheet_to_json(worksheet, {
        header: 1,
        skipEmptyLines: true,
      });

      const headers = rawData[0];
      const dataRows = rawData.slice(1);

      const invalidHeaders = headers.filter(
        (header) => !expectedHeaders.includes(header)
      );
      if (invalidHeaders.length > 0) {
        throw new Error(
          `Invalid headers in sheet "${sheet_name}": ${invalidHeaders.join(
            ", "
          )}`
        );
      }

      dataRows.map((row) => {
        const rowObject = {};
        headers.forEach((header, index) => {
          let value = row[index];

          if (
            header.toLowerCase() === "enrolmentnumber" &&
            typeof value === "string" &&
            value.startsWith("_")
          ) {
            value = value.substring(1);
          }

          rowObject[header] = value !== undefined ? value : null;
        });
        const parsedRow = rowSchema.safeParse(rowObject);
        if (!parsedRow.success) {
          throw new Error(
            `Invalid data in sheet "${sheet_name}": ${parsedRow.error.message}`
          );
        }
        data.push(parsedRow.data);
      });
    });
    return { data, numberOfSheets };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default processExcelFile;
