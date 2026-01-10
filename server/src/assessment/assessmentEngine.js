// assessment/assessmentEngine.js

/* ───────────────── STREAM ECOSYSTEM ───────────────── */

const STREAM_PRIORITY = {
  Science: [
    "ENGINEERING_TECH",
    "MEDICAL_HEALTH",
    "SCIENCE_RESEARCH",
    "AVIATION_MAINTENANCE",
    "ARMED_FORCES"
  ],

  Commerce: [
    "MANAGEMENT_BUSINESS",
    "FINANCE_COMMERCE",
    "ENTREPRENEURSHIP_STARTUP",
    "HOSPITALITY_HOTEL"
  ],

  Arts: [
    "HUMANITIES_SOCIAL",
    "CREATIVE_MEDIA",
    "LAW_LEGAL",
    "EDUCATION_TEACHING",
    "HOSPITALITY_HOTEL"
  ]
};

/* ───────────────── UTIL ───────────────── */

const clamp = (v, min = 0, max = 100) =>
  Math.max(min, Math.min(max, v));

const isNumber = (v) => typeof v === "number" && !Number.isNaN(v);

/* ───────────────── GLOBAL SCORE ───────────────── */

const computeGlobalScore = (s) => {
  const w = {
    COGNITIVE: 0.2,
    NUMERACY: 0.15,
    ACADEMIC: 0.2,
    DISCIPLINE: 0.15,
    RISK: 0.15,
    INTEREST: 0.1,
    VERBAL: 0.05
  };

  let total = 0;
  for (const k in w) {
    total += (isNumber(s[k]) ? s[k] : 0) * w[k];
  }

  return clamp(Math.round(total));
};

/* ───────────────── HARD SUBJECT GATES ───────────────── */

const SUBJECT_GATES = {
  ENGINEERING_TECH: (s) =>
    s.NUMERACY >= 55 && s.COGNITIVE >= 55,

  MEDICAL_HEALTH: (s) =>
    s.ACADEMIC >= 60 && s.DISCIPLINE >= 60,

  SCIENCE_RESEARCH: (s) =>
    s.ACADEMIC >= 70 && s.COGNITIVE >= 65,

  ARMED_FORCES: (s) =>
    s.DISCIPLINE >= 75 && s.RISK >= 70,

  AVIATION_MAINTENANCE: (s) =>
    s.DISCIPLINE >= 75 && s.RISK >= 65,

  FINANCE_COMMERCE: (s) =>
    s.NUMERACY >= 70 && s.DISCIPLINE >= 65,

  // ✅ FIXED MANAGEMENT GATE
  MANAGEMENT_BUSINESS: (s) =>
    isNumber(s.VERBAL) && isNumber(s.COGNITIVE) &&
    (s.VERBAL + s.COGNITIVE) / 2 >= 62,

  ENTREPRENEURSHIP_STARTUP: (s) =>
    s.RISK >= 70 && s.COGNITIVE >= 60 && s.INTEREST >= 65,

  HUMANITIES_SOCIAL: (s) =>
    s.VERBAL >= 65 && s.INTEREST >= 70,

  CREATIVE_MEDIA: (s) =>
    s.INTEREST >= 65,

  EDUCATION_TEACHING: (s) =>
    s.VERBAL >= 70 && s.DISCIPLINE >= 60,

  LAW_LEGAL: (s) =>
    s.VERBAL >= 75 && s.COGNITIVE >= 65,

  HOSPITALITY_HOTEL: (s) =>
    s.DISCIPLINE >= 55
};

/* ───────────────── CCS ───────────────── */

const computeCCS = (signals, career) => {
  let sum = 0;
  let count = 0;

  for (const key in career.minSignals) {
    const required = career.minSignals[key];
    const actual = signals[key];

    if (!isNumber(actual)) return 0;
    if (actual < required * 0.75) return 0;

    sum += Math.min(actual / required, 1.1);
    count++;
  }

  return count ? sum / count : 0;
};

/* ───────────────── MAIN ENGINE ───────────────── */

export const assessCareers = ({
  normalizedSignals,
  careerList,
  studentStream
}) => {
  const results = [];
  const primary = STREAM_PRIORITY[studentStream] || [];

  const globalScore = computeGlobalScore(normalizedSignals);

  for (const career of careerList) {
    if (
      career.allowedStreams &&
      !career.allowedStreams.includes("Any") &&
      !career.allowedStreams.includes(studentStream)
    ) continue;

    if (SUBJECT_GATES[career.id]) {
      if (!SUBJECT_GATES[career.id](normalizedSignals)) continue;
    }

    let ccs = computeCCS(normalizedSignals, career);
    if (ccs === 0) continue;

    // 🔥 BOOST MANAGEMENT SLIGHTLY
    if (career.id === "MANAGEMENT_BUSINESS") {
      ccs *= 1.1;
    }

    if (!primary.includes(career.id)) {
      ccs *= 0.7;
    }

    let tier = "RED";
    if (ccs >= 1.0) tier = "GREEN";
    else if (ccs >= 0.85) tier = "YELLOW";

    results.push({
      careerId: career.id,
      tier,
      compatibilityScore: clamp(Math.round(ccs * 100))
    });
  }

  /* SAFETY NET — ENSURE REPRESENTATION */
if (results.length < 3 && primary.length) {
  primary.forEach((id) => {
    if (!results.find(r => r.careerId === id)) {
      results.push({
        careerId: id,
        tier: "RED",
        compatibilityScore: 50
      });
    }
  });
}

  return {
    blocked: false,
    globalScore,
    careers: results.sort(
      (a, b) => b.compatibilityScore - a.compatibilityScore
    )
  };
};
