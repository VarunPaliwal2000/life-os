import cors from "cors";
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
const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin) {
      return callback(null, true);
    }

    if (corsOrigins.length === 0 || corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
// app.options("*", cors(corsOptions));

// Parse JSON bodies for incoming requests
app.use(express.json());

// Attach the event routes under /api/events
app.use("/api/events", eventsRouter);

// Keep the health route for quick backend checks.
app.use("/life", healthRouter);

export default app;
