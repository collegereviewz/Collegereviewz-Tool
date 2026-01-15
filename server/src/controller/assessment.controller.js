// controller/assessment.controller.js

import StudentProfile from "../models/StudentProfile.model.js";
import { scoreSignals } from "../assessment/signal.scorer.js";
import { normalizeSignals } from "../assessment/signal.normalizer.js";
import { assessCareers } from "../assessment/assessmentEngine.js";
import careersMaster from "../data/careers.list.js";
import { generateAssessmentReport } from "../services/report.generator.js";

/* ───────────────── FINANCE SIGNAL ───────────────── */

const computeFinanceSignal = (profile) => {
  switch (profile.familyAnnualBudget) {
    case "> 10 Lakh": return 90;
    case "6–10 Lakh": return 75;
    case "3–6 Lakh": return 60;
    case "1–3 Lakh": return 45;
    default: return 30;
  }
};

/* ───────────────── NORMALIZED → MODEL SIGNALS ───────────────── */

const toModelSignals = (signals, profile) => ({
  cognitive: signals.COGNITIVE ?? 0,
  numeracy: signals.NUMERACY ?? 0,
  academic: signals.ACADEMIC ?? 0,
  verbal: signals.VERBAL ?? 0,
  interest: signals.INTEREST ?? 0,
  discipline: signals.DISCIPLINE ?? 0,
  risk: signals.RISK ?? 0,
  finance: computeFinanceSignal(profile)
});

/* ───────────────── CONTROLLER ───────────────── */

export const runAssessment = async (req, res) => {
  try {
    const { studentId, profileData, answers } = req.body;

    if (!studentId || !profileData || !answers) {
      return res.status(400).json({ success: false, error: "Invalid payload" });
    }

    /* STEP 1: Score + Normalize */
    const rawSignals = scoreSignals(answers);
    const normalizedSignals = normalizeSignals(rawSignals);

    /* STEP 2: Career Assessment */
    const assessment = assessCareers({
      normalizedSignals,
      careerList: careersMaster,
      studentStream: profileData.stream
    });

    if (typeof assessment.globalScore !== "number") {
      throw new Error("globalScore missing from assessment engine");
    }

    /* STEP 3: Enrich Careers (🚨 HARD FILTER undefined) */
    const enrichedCareers = assessment.careers
      .map((c) => {
        const full = careersMaster.find(x => x.id === c.careerId);
        if (!full) return null; // 🚨 CRITICAL FIX
        return {
          ...full,
          tier: c.tier,
          compatibilityScore: c.compatibilityScore
        };
      })
      .filter(Boolean); // 🚨 REMOVE undefined COMPLETELY

    /* STEP 4: Persist Profile */
    const studentProfile = await StudentProfile.create({
      studentId,
      ...profileData,
      assessmentSignals: toModelSignals(normalizedSignals, profileData),
      globalScore: assessment.globalScore
    });

    /* STEP 5: Generate Report */
    const reportPath = generateAssessmentReport({
      studentProfile,
      signals: toModelSignals(normalizedSignals, profileData),
      careers: enrichedCareers
    });
    // 🔥 ADD THIS BLOCK HERE
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.BASE_URL
        : "http://localhost:5000";

    const reportUrl = `${baseUrl}/reports/career-report-${studentId}.pdf`;

    res.json({ success: true, reportPath });

  } catch (err) {
    console.error("ASSESSMENT ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
