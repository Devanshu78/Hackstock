import { Component } from "../../models/componentSchema.js";
import { Event } from "../../models/eventSchema.js";
import { Student } from "../../models/studentSchema.js";
import { Bidding } from "../../models/biddingSchema.js";
import { Winner } from "../../models/winnerSchema.js";

export const processBid = async (bidData) => {
  try {
    const { componentId, points, flameCoinUsed, userId, eventId, timestamp } =
      bidData;
    const user = await Student.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    const component = await Component.findById(componentId);
    if (!component) {
      throw new Error("Component not found");
    }
    // NOTE final review m on karunga!!!
    // if (flameCoinUsed) {
    //   points -= user.firePoints;
    //   user.points -= points;
    //   user.firePoints = 0;
    // } else {
    //   user.points -= points;
    // }
    await user.save();
    const placed = await Bidding.create({
      biddingAmount: points,
      componentName: component.componentName,
      personId: user.enrolmentNumber,
      semester: user.semester,
      points: user.points,
      bidTime: timestamp,
    });
    if (!placed) {
      throw new Error("Bid not placed");
    }
    return placed;
  } catch (error) {
    console.error("Error processing bid:", error);
  }
};

export const processResult = async (req, res) => {
  try {
    const unprocessedBids = await Bidding.find({ processed: { $ne: true } });
    if (unprocessedBids.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nothing to process",
      });
    }
    const latestDateGroup = await Bidding.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$bidTime" },
          },
          bids: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 1 },
    ]);

    const { _id: latestDate, bids } = latestDateGroup[0];
    console.log(latestDate);
    const result = await Bidding.aggregate([
      {
        $match: {
          processed: { $ne: true },
          bidTime: {
            $gte: new Date(`${latestDate}T00:00:00.000Z`),
          },
        },
      },
      {
        $sort: {
          biddingAmount: -1,
          semester: -1,
          points: -1,
          bidTime: 1,
        },
      },
      {
        $group: {
          _id: "$componentName",
          totalBids: { $sum: 1 },
          bids: {
            $push: {
              personId: "$personId",
              biddingAmount: "$biddingAmount",
              semester: "$semester",
              points: "$points",
              bidTime: "$bidTime",
            },
          },
        },
      },
      {
        $project: {
          componentName: "$_id",
          totalBids: 1,
          winner: { $arrayElemAt: ["$bids", 0] },
        },
      },
      {
        $project: {
          componentName: 1,
          totalBids: 1,
          "winner.personId": 1,
          "winner.biddingAmount": 1,
          "winner.semester": 1,
          "winner.points": 1,
          "winner.bidTime": 1,
        },
      },
    ]);

    const newWinners = result.map((item) => ({
      componentName: item.componentName,
      personId: item.winner.personId,
      semester: item.winner.semester,
      biddingAmount: item.winner.biddingAmount,
      date: new Date(),
    }));

    await Winner.insertMany(newWinners);

    await Bidding.updateMany(
      { processed: { $ne: true } },
      { $set: { processed: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Result processed successfully",
      data: newWinners,
    });
  } catch (error) {
    console.error("Error processing result:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getWinnerResult = async (req, res) => {
  try {
    const result = await Winner.aggregate([
      {
        $group: {
          _id: "$date",
          winner: {
            $push: {
              $mergeObjects: "$$ROOT",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          winner: {
            $sortArray: {
              input: "$winner",
              sortBy: {
                semester: 1,
                biddingAmount: 1,
              },
            },
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error processing result:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const processWinnerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const winner = await Winner.findById(id);
    if (!winner) {
      return res.status(404).json({ message: "Winner not found" });
    }
    winner.status = status;
    const newWinner = await winner.save();
    console.log(newWinner);
    return res.status(200).json({
      success: true,
      message: "Winner status updated successfully",
    });
  } catch (error) {
    console.error("Error processing result:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
