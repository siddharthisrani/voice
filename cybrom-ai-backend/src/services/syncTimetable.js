import axios from "axios";
import AiSchedule from "../models/AiSchedule.js";

export const syncTimetable = async () => {
  try {
    const res = await axios.get(process.env.SHEET_API_URL);
    const today = new Date().toISOString().split("T")[0];

    await AiSchedule.deleteMany({ date: today });
    await AiSchedule.insertMany(res.data);

    console.log("✅ Timetable synced");
  } catch (err) {
    console.error("❌ Sync failed", err.message);
  }
};
