import AiSchedule from "../models/AiSchedule.js";
import { isCurrentTimeInRange } from "../utils/timeUtils.js";

export const getCurrentRunningClass = async () => {
  const today = new Date().toISOString().split("T")[0];

  const schedules = await AiSchedule.find({
    date: today,
    status: "Active"
  });

  for (const cls of schedules) {
    if (isCurrentTimeInRange(cls.time)) {
      return cls;
    }
  }
  return null;
};

export const findByFaculty = async (name) => {
  return AiSchedule.find({
    faculty: { $regex: name, $options: "i" },
    status: "Active"
  });
};



export const findByBatch = async (batch) => {
  return AiSchedule.findOne({
    batchCode: { $regex: batch, $options: "i" }
  });
};

export const findByFloor = async (floor) => {
  return AiSchedule.find({
    floor: { $regex: floor, $options: "i" }
  });
};
