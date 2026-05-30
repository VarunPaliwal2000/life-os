import express from "express";
import { healthRouter } from "./routes/health";

// Create the Express application
const app = express();

// Parse JSON bodies for incoming requests
app.use(express.json());

// Base API route for health checks and future API endpoints
app.use("/life", healthRouter);

export default app;
