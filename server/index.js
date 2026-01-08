import dotenv from "dotenv";
import { server } from "./src/app.js";
import connectDB from "./src/DB/connectDB.js";
import "./src/sockets/worker.js";
import { initializeScheduledEvents } from "./src/Controllers/admin/eventController.js";
import {
  warmUpCache,
  schedulePeriodicCacheWarming,
} from "./src/utils/cacheWarming.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(async () => {
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, "0.0.0.0", async () => {
      // Initialize scheduled events
      initializeScheduledEvents();

      // Warm up cache on server start
      await warmUpCache();

      // Schedule periodic cache warming every 30 minutes
      // schedulePeriodicCacheWarming(30);

      console.log(`🚀 HackStock Server Started Successfully!`);
      console.log(`${"=".repeat(60)}`);
      console.log(`✅ Server running on port: ${PORT}`);
      console.log(`✅ Database connected: ${process.env.DBNAME}`);
      console.log(`✅ Redis caching: ENABLED`);
      console.log(`\n📡 Network Access:`);
      console.log(`   - Local:          http://localhost:${PORT}`);
    });
  })
  .catch((err) =>
    console.log("❌ MONGO DB connection failed !!! ", err.message)
  );
