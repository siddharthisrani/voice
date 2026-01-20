import express from "express";
import { getCurrentRunningClass } from "../services/currentClassService.js";

const router = express.Router();

router.get("/current", async (req, res) => {
  const runningClass = await getCurrentRunningClass();

  if (!runningClass) {
    return res.json({
      message: "No class is running right now"
    });
  }

  res.json({
    message: "Class is currently running",
    data: runningClass
  });
});

export default router;
