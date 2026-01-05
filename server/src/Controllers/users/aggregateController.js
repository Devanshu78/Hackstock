import { Result } from "../../models/resultSchema.js";

export const getAggregate = async (req, res, next) => {
  try {
    const result = await Result.aggregate([
      {
        $group: {
          _id: "$semester",
          maxResult: { $max: "$result" },
          minResult: { $min: "$result" },
        },
      },
    ]);

    const aggregates = result.map((doc) => ({
      semester: doc._id,
      maxResult: doc.maxResult,
      minResult: doc.minResult,
    }));
    return aggregates;
  } catch (err) {
    console.error(err);
    return;
  }
};
