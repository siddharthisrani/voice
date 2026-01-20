import Schedule from "../models/AiSchedule.js";
import { facultyBrain } from "./facultyBrain.js";

export async function smartAnswer(question) {
  const q = question.toLowerCase();

  // 1️⃣ FACULTY QUESTION
  for (const key in facultyBrain) {
    if (q.includes(key)) {
      const faculty = facultyBrain[key];

      // check live class
      const liveClass = await Schedule.findOne({
        faculty: faculty.name,
        status: "Active"
      });

      if (liveClass) {
        return `Abhi ${faculty.name} ki class ${liveClass.room} mein chal rahi hai, ${liveClass.floor} par, time ${liveClass.time}.`;
      }

      return faculty.defaultReply + " Abhi koi live class nahi chal rahi.";
    }
  }

  // 2️⃣ GENERAL CLASS QUESTION
  const live = await Schedule.findOne({ status: "Active" });
  if (live) {
    return `Abhi ${live.batchCode} ki class ${live.room} mein chal rahi hai.`;
  }

  // 3️⃣ FALLBACK
  return "Is question ke liye please office se contact karein.";
}
