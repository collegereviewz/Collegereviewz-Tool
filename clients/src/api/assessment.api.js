// src/api/assessment.api.js
import axios from "axios";

/**
 * Axios instance
 * - Localhost  → http://localhost:5000
 * - Production → same origin (Render URL)
 */
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "" // same domain in production
      : "http://localhost:5000",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Run Career Assessment
 * Backend Route:
 * POST /api/assessment/run
 */
export const runAssessment = (payload) => {
  return API.post("/api/assessment/run", payload);
};

export const fetchQuestionnaire = (currentClass) => {
  return API.get(
    `/api/questionnaire/${encodeURIComponent(currentClass)}`
  );
};

