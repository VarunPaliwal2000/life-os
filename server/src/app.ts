import express from "express";
import { eventsRouter } from "./routes/events";
import { healthRouter } from "./routes/health";

// Create the Express application
const app = express();

// Parse JSON bodies for incoming requests
app.use(express.json());

// Attach the event routes under /api/events
app.use("/api/events", eventsRouter);

// Keep the health route for quick backend checks.
app.use("/life", healthRouter);

export default app;
