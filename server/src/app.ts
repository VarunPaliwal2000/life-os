import express from "express";
import { eventsRouter } from "./routes/events";
import { healthRouter } from "./routes/health";

// Create the Express application
const app = express();

/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 *
 * CORS allows requests from frontend (different domain) to backend API.
 *
 * - In development: allows localhost:5173 (Vite dev server)
 * - In production: allows Vercel frontend URL
 *
 * Environment variable CORS_ORIGINS should be a comma-separated list of allowed origins.
 * Example: "https://app.vercel.app,https://app-staging.vercel.app"
 */
const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173").split(
  ",",
);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if request origin is in the allowed list
  if (origin && corsOrigins.some((allowed) => origin === allowed.trim())) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.header("Access-Control-Allow-Headers", "Content-Type");
  }

  next();
});

// Parse JSON bodies for incoming requests
app.use(express.json());

// Attach the event routes under /api/events
app.use("/api/events", eventsRouter);

// Keep the health route for quick backend checks.
app.use("/life", healthRouter);

export default app;
