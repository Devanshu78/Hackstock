import { Component } from "../models/componentSchema.js";
import { Event } from "../models/eventSchema.js";
import { Winner } from "../models/winnerSchema.js";
import { warmCache } from "../middleware/cacheMiddleware.js";
import { CACHE_KEYS, CACHE_TTL } from "./cacheKeys.js";

/**
 * Warm up frequently accessed data on server start
 */
export const warmUpCache = async () => {
  console.log("🔥 Starting cache warming...");

  try {
    // Warm up components (most frequently accessed)
    const components = await Component.find({}).sort({
      componentName: 1,
      _id: 1,
    });
    await warmCache(
      CACHE_KEYS.COMPONENTS_ALL,
      { data: components, message: "Success" },
      CACHE_TTL.MEDIUM
    );

    // Warm up active event
    const activeEvent = await Event.findOne({
      $or: [
        { startTime: { $gte: new Date() } },
        {
          startTime: { $lte: new Date() },
          endTime: { $gte: new Date() },
        },
      ],
    });
    if (activeEvent) {
      await warmCache(
        CACHE_KEYS.EVENT_ACTIVE,
        { data: activeEvent },
        CACHE_TTL.SHORT
      );
    }

    // Warm up recent winners
    const winners = await Winner.aggregate([
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
      {
        $limit: 1,
      },
    ]);
    if (winners.length > 0) {
      await warmCache(
        CACHE_KEYS.WINNERS_ALL,
        winners,
        CACHE_TTL.SHORT
      );
    }

    console.log("✅ Cache warming completed successfully!");
    return true;
  } catch (error) {
    console.error("❌ Cache warming failed:", error.message);
    return false;
  }
};

/**
 * Schedule periodic cache warming
 * @param {number} intervalMinutes - Interval in minutes
 */
export const schedulePeriodicCacheWarming = (intervalMinutes = 30) => {
  setInterval(async () => {
    console.log("🔄 Periodic cache warming triggered...");
    await warmUpCache();
  }, intervalMinutes * 60 * 1000);
};

export default { warmUpCache, schedulePeriodicCacheWarming };

