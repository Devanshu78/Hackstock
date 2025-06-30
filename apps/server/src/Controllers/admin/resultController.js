import { Result } from "../../models/resultSchema.js";
import { checkResult } from "../../Validator/result-validator.js";
import fs from "fs";
import processExcelFile from "./excelParser.js";

export const addResult = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an Excel file." });
    }

    const filePath = req.file.path; // File path on server

    const { numberOfSheets, data } = processExcelFile(filePath);
    if (data.length === 0) {
      return res
        .status(400)
        .json({ message: "No data found in the Excel file." });
    }
    for (const arr of data) {
      try {
        const { data, error } = checkResult.safeParse(arr);
        if (error) {
          return res.status(500).json({ message: error.errors[0].message });
        }
        const find = await Result.findOne({
          enrolmentNumber: data.enrolmentNumber,
        });
        if (!find) {
          await Result.create(data);
        } else {
          await Result.updateOne(
            { enrolmentNumber: data.enrolmentNumber },
            data
          );
        }
      } catch (error) {
        console.error("Error saving to DB:", error);
        return res.status(500).json({ message: "Error saving result" });
      }
    }

    if (numberOfSheets == 3) {
      await Result.deleteMany({ semester: "7" });
    }

    // Once done, remove the file from server
    fs.unlinkSync(filePath);

    return res.status(201).json({ message: "Data successfully" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(404)
      .json({ message: err?.message || "Result upload failed" });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.aggregate([
      {
        $group: {
          _id: "$semester",
          results: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error getting results" });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await Result.findByIdAndDelete(id);
    return res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = checkResult.safeParse(req.body);
    if (error) {
      console.log(error.errors[0].message);
      return res.status(500).json({ message: error.errors[0].message });
    }
    const result = await Result.findByIdAndUpdate(id, data, { new: true });
    return res
      .status(200)
      .json({ message: "Result updated successfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
