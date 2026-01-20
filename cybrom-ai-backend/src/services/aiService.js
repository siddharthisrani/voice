import {
  getCurrentRunningClass,
  findByBatch,
  findByFloor,
  findByFaculty
} from "./currentClassService.js";
import { isCurrentTimeInRange } from "../utils/timeUtils.js";


export const askAI = async (question) => {
  const q = question.toLowerCase();

  // 1️⃣ FACULTY QUESTION (TIME-AWARE ✅)
if (q.includes("sir") || q.includes("mam") || q.includes("maam")) {
  const facultyClasses = await findByFaculty(question);

  // Check if class is running NOW
  for (const cls of facultyClasses) {
    if (isCurrentTimeInRange(cls.time)) {
      return `Abhi ${cls.faculty} ki class ${cls.room} mein chal rahi hai, ${cls.floor} par, time ${cls.time}.`;
    }
  }

  // If none running now
  if (facultyClasses.length) {
    const next = facultyClasses[0];
    return `${next.faculty} ki abhi koi live class nahi chal rahi. Unki next class ${next.time} par ${next.room} (${next.floor}) mein hoti hai.`;
  }

  return "Is faculty ka koi schedule available nahi hai.";
}

  // 2️⃣ Which class is running now
  if (q.includes("running")) {
    const cls = await getCurrentRunningClass();
    if (!cls) return "Abhi koi class nahi chal rahi.";

    return `${cls.batchCode} ki class ${cls.room} mein chal rahi hai, ${cls.floor} par.`;
  }

  // 3️⃣ Batch based query
  if (q.includes("bca") || q.includes("da") || q.includes("ds")) {
    const batch = await findByBatch(question);
    if (!batch) return "Is batch ki abhi koi class nahi mil rahi.";

    return `${batch.batchCode} ki class ${batch.room} mein hai, ${batch.floor} par.`;
  }

  // 4️⃣ Floor based query
  if (q.includes("floor")) {
    const floorClasses = await findByFloor(question);
    if (!floorClasses.length) {
      return "Is floor par abhi koi class nahi hai.";
    }

    return floorClasses
      .map(c => `${c.batchCode} (${c.room})`)
      .join(". ");
  }

  // 5️⃣ FALLBACK
  return "Is question ke liye please office se contact karein.";
};
