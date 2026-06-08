/**
 * API Configuration
 *
 * Handles API base URL for different environments:
 * - Development: uses relative "/api" path (proxied by Vite to localhost:4000)
 * - Production: uses full Render API URL from VITE_API_URL environment variable
 *
 * Environment variables:
 * - NODE_ENV: Set to "production" in production, "development" in dev
 * - VITE_API_URL: Full backend URL for production (e.g., https://life-os-api.onrender.com)
 */

export const API_BASE_URL =
  process.env.VITE_API_URL || "https://api.example.com";

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events`,
  HEALTH: `${API_BASE_URL}/health`,
} as const;
