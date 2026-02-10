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
      return res.status(400).json({
        success: false,
        error: "Invalid payload"
      });
    }

    /* STEP 1 */
    const rawSignals = scoreSignals(answers, profileData.currentClass);
    const normalizedSignals = normalizeSignals(rawSignals);

    /* STEP 2 */
    const assessment = assessCareers({
      normalizedSignals,
      careerList: careersMaster,
      studentStream: profileData.stream
    });

    /* STEP 3 */
    const enrichedCareers = assessment.careers
      .map(c => {
        const full = careersMaster.find(x => x.id === c.careerId);
        return full
          ? { ...full, tier: c.tier, compatibilityScore: c.compatibilityScore }
          : null;
      })
      .filter(Boolean);

    /* STEP 4 */
    const studentProfile = await StudentProfile.create({
      studentId,
      ...profileData,
      assessmentSignals: toModelSignals(normalizedSignals, profileData),
      globalScore: assessment.globalScore
    });

    /* STEP 5 — FIRE & FORGET PDF */
    generateAssessmentReport({
      studentProfile,
      signals: toModelSignals(normalizedSignals, profileData),
      careers: enrichedCareers
    });

    /* STEP 6 — YOU ALREADY KNOW THE FILE NAME */
    const reportFileName = `career-report-${studentProfile.studentId}.pdf`;

    const BASE_URL =
      process.env.BASE_URL ||
      process.env.RENDER_EXTERNAL_URL ||
      `${req.protocol}://${req.get("host")}`;

    const reportUrl = `${BASE_URL}/reports/${reportFileName}`;

    return res.json({
      success: true,
      reportUrl
    });

  } catch (err) {
    console.error("ASSESSMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
