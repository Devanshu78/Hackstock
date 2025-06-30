import dotenv from "dotenv";
import { server } from "./src/app.js";
import connectDB from "./src/DB/connectDB.js";
import "./src/sockets/worker.js";
import { initializeScheduledEvents } from "./src/Controllers/admin/eventController.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, "0.0.0.0", () => {
      initializeScheduledEvents();
      console.log(`Server is runing at port ${process.env.PORT}`);
      console.log(`Database is connected at ${process.env.DBNAME}`);
    });
  })
  .catch((err) => console.log("MONGO DB connection failed !!! ", err.message));
