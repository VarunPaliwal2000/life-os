import { Router } from "express";

const router = Router();

// A simple health check route to confirm the backend is running.
router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptimeSeconds: process.uptime(),
  });
});

router.get("/career", (_req, res) => {
  res.json({
    goal: "Senior Frontend Developer"
  });
});

export { router as healthRouter };
