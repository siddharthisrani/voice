import cron from "node-cron";
import { syncTimetable } from "../services/syncTimetable.js";

cron.schedule("*/10 * * * *", () => {
  console.log("🔄 Running timetable sync...");
  syncTimetable();
});
