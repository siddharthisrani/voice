import mongoose from "mongoose";

const AiScheduleSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },

  floor: { type: String, required: true },
  room: { type: String, required: true },

  batchCode: { type: String, required: true },
  faculty: { type: String, default: "" },
  technology: { type: String, default: "" },

  startEnd: { type: String, default: "" },
  nextBatch: { type: String, default: "" },

  status: { type: String, default: "Active" }
}, { timestamps: true });

export default mongoose.model("AiSchedule", AiScheduleSchema);
