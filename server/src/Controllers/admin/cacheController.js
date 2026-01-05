import redisConnection from "../../utils/redisConnection.js";
import { invalidateCache, getCacheStats } from "../../middleware/cacheMiddleware.js";

/**
 * Get cache statistics and health
 */
export const getCacheHealth = async (req, res) => {
  try {
    const dbSize = await redisConnection.dbsize();
    const info = await redisConnection.info("stats");
    const memory = await redisConnection.info("memory");
    
    // Parse info strings
    const parseInfo = (infoString) => {
      const lines = infoString.split("\r\n");
      const data = {};
      lines.forEach((line) => {
        if (line && !line.startsWith("#")) {
          const [key, value] = line.split(":");
          if (key && value) {
            data[key] = value;
          }
        }
      });
      return data;
    };

    const statsData = parseInfo(info);
    const memoryData = parseInfo(memory);

    // Get sample keys by pattern
    const componentKeys = await redisConnection.keys("component*");
    const projectKeys = await redisConnection.keys("project*");
    const userKeys = await redisConnection.keys("user*");
    const eventKeys = await redisConnection.keys("event*");
    const winnerKeys = await redisConnection.keys("winner*");

    return res.status(200).json({
      success: true,
      data: {
        totalKeys: dbSize,
        keysByType: {
          components: componentKeys.length,
          projects: projectKeys.length,
          users: userKeys.length,
          events: eventKeys.length,
          winners: winnerKeys.length,
        },
        stats: {
          totalConnectionsReceived: statsData.total_connections_received,
          totalCommandsProcessed: statsData.total_commands_processed,
          instantaneousOpsPerSec: statsData.instantaneous_ops_per_sec,
          keyspaceHits: statsData.keyspace_hits || 0,
          keyspaceMisses: statsData.keyspace_misses || 0,
          hitRate: statsData.keyspace_hits && statsData.keyspace_misses
            ? `${((parseInt(statsData.keyspace_hits) / (parseInt(statsData.keyspace_hits) + parseInt(statsData.keyspace_misses))) * 100).toFixed(2)}%`
            : "N/A",
        },
        memory: {
          usedMemory: memoryData.used_memory_human,
          usedMemoryPeak: memoryData.used_memory_peak_human,
          memFragmentationRatio: memoryData.mem_fragmentation_ratio,
        },
      },
    });
  } catch (error) {
    console.error("Error getting cache health:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get cache health",
      error: error.message,
    });
  }
};

/**
 * Clear all cache (use with caution!)
 */
export const clearAllCache = async (req, res) => {
  try {
    await redisConnection.flushdb();
    return res.status(200).json({
      success: true,
      message: "All cache cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear cache",
      error: error.message,
    });
  }
};

/**
 * Clear cache by pattern
 */
export const clearCacheByPattern = async (req, res) => {
  try {
    const { pattern } = req.body;
    if (!pattern) {
      return res.status(400).json({
        success: false,
        message: "Pattern is required",
      });
    }
    
    const count = await invalidateCache(pattern);
    return res.status(200).json({
      success: true,
      message: `Cleared ${count} cache keys matching pattern: ${pattern}`,
      count,
    });
  } catch (error) {
    console.error("Error clearing cache by pattern:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear cache",
      error: error.message,
    });
  }
};

/**
 * Get all cache keys
 */
export const getAllCacheKeys = async (req, res) => {
  try {
    const { pattern = "*", limit = 100 } = req.query;
    const keys = await redisConnection.keys(pattern);
    
    // Get TTL for each key (limited to prevent performance issues)
    const keysWithTTL = await Promise.all(
      keys.slice(0, limit).map(async (key) => {
        const ttl = await redisConnection.ttl(key);
        return { key, ttl };
      })
    );

    return res.status(200).json({
      success: true,
      data: {
        total: keys.length,
        showing: keysWithTTL.length,
        keys: keysWithTTL,
      },
    });
  } catch (error) {
    console.error("Error getting cache keys:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get cache keys",
      error: error.message,
    });
  }
};

export default {
  getCacheHealth,
  clearAllCache,
  clearCacheByPattern,
  getAllCacheKeys,
};

