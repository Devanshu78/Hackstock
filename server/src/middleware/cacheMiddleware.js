import redisConnection from "../utils/redisConnection.js";

/**
 * Generic cache middleware for GET requests
 * @param {string} keyPrefix - Prefix for the cache key (e.g., 'components', 'projects')
 * @param {number} ttl - Time to live in seconds (default: 300 = 5 minutes)
 * @param {function} keyGenerator - Optional function to generate custom cache key
 */
export const cacheMiddleware = (keyPrefix, ttl = 300, keyGenerator = null) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    try {
      // Generate cache key
      let cacheKey;
      if (keyGenerator && typeof keyGenerator === "function") {
        cacheKey = keyGenerator(req);
      } else {
        // Default key generation
        const userId = req.user?._id || req.user?.id || "guest";
        const params = req.params.id || "";
        const query = Object.keys(req.query).length
          ? JSON.stringify(req.query)
          : "";
        cacheKey = `${keyPrefix}:${userId}:${params}:${query}`;
      }

      // Try to get from cache
      const cachedData = await redisConnection.get(cacheKey);

      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

      console.log(`❌ Cache MISS: ${cacheKey}`);

      // Store original res.json
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = function (data) {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redisConnection
            .setex(cacheKey, ttl, JSON.stringify(data))
            .then(() => {
              console.log(`💾 Cached: ${cacheKey} (TTL: ${ttl}s)`);
            })
            .catch((err) => {
              console.error(`❌ Cache set error: ${err.message}`);
            });
        }
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error(`Cache middleware error: ${error.message}`);
      // Don't break the request if cache fails
      next();
    }
  };
};

/**
 * Invalidate cache by pattern
 * @param {string} pattern - Pattern to match keys (e.g., 'components:*', 'user:123:*')
 */
export const invalidateCache = async (pattern) => {
  try {
    const keys = await redisConnection.keys(pattern);
    if (keys.length > 0) {
      await redisConnection.del(...keys);
      console.log(`🗑️  Invalidated ${keys.length} cache keys matching: ${pattern}`);
    }
    return keys.length;
  } catch (error) {
    console.error(`Cache invalidation error: ${error.message}`);
    return 0;
  }
};

/**
 * Invalidate multiple cache patterns
 * @param {string[]} patterns - Array of patterns to invalidate
 */
export const invalidateMultiplePatterns = async (patterns) => {
  try {
    const promises = patterns.map((pattern) => invalidateCache(pattern));
    const results = await Promise.all(promises);
    const total = results.reduce((sum, count) => sum + count, 0);
    console.log(`🗑️  Total invalidated: ${total} keys`);
    return total;
  } catch (error) {
    console.error(`Multiple cache invalidation error: ${error.message}`);
    return 0;
  }
};

/**
 * Warm up cache with data
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in seconds
 */
export const warmCache = async (key, data, ttl = 300) => {
  try {
    await redisConnection.setex(key, ttl, JSON.stringify(data));
    console.log(`🔥 Cache warmed: ${key}`);
    return true;
  } catch (error) {
    console.error(`Cache warming error: ${error.message}`);
    return false;
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = async () => {
  try {
    const info = await redisConnection.info("stats");
    const keys = await redisConnection.dbsize();
    return {
      totalKeys: keys,
      info: info,
    };
  } catch (error) {
    console.error(`Cache stats error: ${error.message}`);
    return null;
  }
};

export default cacheMiddleware;

