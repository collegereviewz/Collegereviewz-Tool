const careers = [

  /* ───────────────── ENGINEERING & TECHNOLOGY ───────────────── */
  {
    id: "ENGINEERING_TECH",
    name: "Engineering & Technology",
    category: "Technology",
    allowedStreams: ["Science"],
    durationYears: "4–6",
    costLevel: "MEDIUM–HIGH",
    roles: [
      "Software Engineer","Full Stack Developer","AI Engineer","Data Scientist",
      "Cloud Engineer","Cybersecurity Analyst","Blockchain Developer",
      "Embedded Systems Engineer","Robotics Engineer","DevOps Engineer",
      "Game Developer","Mobile App Developer","ML Researcher",
      "Systems Architect","Product Engineer","QA Engineer","Site Reliability Engineer"
    ],
    rolesAbroad: [
      "Software Engineer (FAANG)","AI Research Scientist","Machine Learning Engineer",
      "Cloud Architect","Cybersecurity Specialist","Robotics Engineer",
      "Research Engineer","Systems Engineer","Data Engineer"
    ],
    exams: ["JEE Main","JEE Advanced","BITSAT"],
    feesIndia: "₹1.5L – ₹12L",
    feesAbroad: "$80k – $250k",
    salaryIndia: "₹6 – ₹30+ LPA",
    salaryAbroad: "$80k – $200k",
    minSignals: { COGNITIVE: 60, NUMERACY: 55, DISCIPLINE: 50 }
  },

  /* ───────────────── MEDICAL & HEALTHCARE ───────────────── */
  {
    id: "MEDICAL_HEALTH",
    name: "Medical & Healthcare",
    category: "Healthcare",
    allowedStreams: ["Science"],
    durationYears: "5–10",
    costLevel: "HIGH",
    roles: [
      "Doctor","Surgeon","Dentist","Veterinarian","Radiologist",
      "Psychiatrist","Public Health Specialist","Medical Researcher"
    ],
    rolesAbroad: [
      "Clinical Research Scientist","Specialist Physician","Epidemiologist"
    ],
    exams: ["NEET UG","NEET PG"],
    feesIndia: "₹5L – ₹1Cr",
    feesAbroad: "$150k – $400k",
    salaryIndia: "₹8 – ₹50+ LPA",
    salaryAbroad: "$120k – $300k",
    minSignals: { ACADEMIC: 70, DISCIPLINE: 65, RISK: 60 }
  },

  /* ───────────────── SCIENCE & RESEARCH ───────────────── */
  {
    id: "SCIENCE_RESEARCH",
    name: "Science & Research",
    category: "Research",
    allowedStreams: ["Science"],
    durationYears: "5–10",
    costLevel: "LOW–MEDIUM",
    roles: [
      "Scientist","Research Fellow","Physicist","Chemist",
      "Biologist","Astronomer","Materials Scientist","Climate Scientist"
    ],
    rolesAbroad: [
      "Research Scientist","Postdoctoral Fellow","Space Scientist","Quantum Researcher"
    ],
    exams: ["IISER Aptitude","CSIR NET","GATE","JAM"],
    feesIndia: "₹50k – ₹3L",
    feesAbroad: "$30k – $120k",
    salaryIndia: "₹6 – ₹20 LPA",
    salaryAbroad: "$70k – $150k",
    minSignals: { ACADEMIC: 70, COGNITIVE: 65 }
  },

  /* ───────────────── ARMED FORCES & DEFENCE ───────────────── */
  {
    id: "ARMED_FORCES",
    name: "Armed Forces & Defence",
    category: "Defence",
    allowedStreams: ["Science","Arts","Commerce"],
    durationYears: "10–20",
    costLevel: "LOW",
    roles: [
      "Army Officer","Navy Officer","Air Force Officer",
      "Technical Officer","Intelligence Officer","Defence Analyst"
    ],
    rolesAbroad: [
      "UN Peacekeeping Officer","Defence Attaché"
    ],
    exams: ["NDA","CDS","AFCAT","CAPF"],
    feesIndia: "Nil (Govt Sponsored)",
    feesAbroad: "N/A",
    salaryIndia: "₹6 – ₹25+ LPA",
    salaryAbroad: "$60k – $120k",
    minSignals: { DISCIPLINE: 75, RISK: 70 }
  },

  /* ───────────────── FINANCE & COMMERCE ───────────────── */
  {
    id: "FINANCE_COMMERCE",
    name: "Finance & Accounting",
    category: "Finance",
    allowedStreams: ["Commerce","Science"],
    durationYears: "3–7",
    costLevel: "LOW–MEDIUM",
    roles: [
      "CA","Investment Banker","Financial Analyst",
      "Portfolio Manager","Risk Analyst","Actuary"
    ],
    rolesAbroad: [
      "Investment Banker","Quant Analyst","Hedge Fund Analyst"
    ],
    exams: ["CA","CFA","FRM"],
    feesIndia: "₹2L – ₹8L",
    feesAbroad: "$60k – $200k",
    salaryIndia: "₹7 – ₹25+ LPA",
    salaryAbroad: "$80k – $180k",
    minSignals: { NUMERACY: 75, DISCIPLINE: 70, COGNITIVE: 60 }
  },

  /* ───────────────── ENTREPRENEURSHIP & STARTUPS ───────────────── */
  {
    id: "ENTREPRENEURSHIP_STARTUP",
    name: "Entrepreneurship & Startups",
    category: "Business",
    allowedStreams: ["Any"],
    durationYears: "Variable",
    costLevel: "VARIABLE",
    roles: [
      "Startup Founder","Business Owner","Social Entrepreneur",
      "Product Founder","Consultant"
    ],
    rolesAbroad: [
      "Startup Founder (Global)","VC-backed Entrepreneur"
    ],
    exams: ["None"],
    feesIndia: "₹0 – ₹5L",
    feesAbroad: "Variable",
    salaryIndia: "₹0 – Unlimited",
    salaryAbroad: "Unlimited",
    minSignals: { RISK: 70, COGNITIVE: 60, INTEREST: 65 }
  },

  /* ───────────────── HOSPITALITY & HOTEL MANAGEMENT ───────────────── */
  {
    id: "HOSPITALITY_HOTEL",
    name: "Hospitality & Hotel Management",
    category: "Service Industry",
    allowedStreams: ["Arts","Commerce","Science"],
    durationYears: "3–4",
    costLevel: "MEDIUM",
    roles: [
      "Hotel Manager",
      "Front Office Manager",
      "Food & Beverage Manager",
      "Event Manager",
      "Resort Operations Manager",
      "Cruise Line Executive",
      "Guest Relations Manager",
      "Luxury Hospitality Consultant"
    ],
    rolesAbroad: [
      "International Hotel Manager",
      "Cruise Operations Executive",
      "Resort Director",
      "Luxury Brand Hospitality Manager"
    ],
    exams: ["NCHMCT JEE","IIHM eCHAT","State HM Entrance Exams"],
    feesIndia: "₹2L – ₹8L",
    feesAbroad: "$40k – $120k",
    salaryIndia: "₹3 – ₹15+ LPA",
    salaryAbroad: "$40k – $120k",
    minSignals: { DISCIPLINE: 55, INTEREST: 55 }
  },

  /* ───────────────── EDUCATION & TEACHING ───────────────── */
  {
    id: "EDUCATION_TEACHING",
    name: "Education & Teaching",
    category: "Education",
    allowedStreams: ["Arts","Science","Commerce"],
    durationYears: "3–8",
    costLevel: "LOW–MEDIUM",
    roles: [
      "Teacher","Professor","Academic Researcher",
      "Education Consultant","Curriculum Designer"
    ],
    rolesAbroad: [
      "University Lecturer","International School Teacher"
    ],
    exams: ["CTET","NET","SET","B.Ed"],
    feesIndia: "₹50k – ₹3L",
    feesAbroad: "$20k – $80k",
    salaryIndia: "₹4 – ₹15 LPA",
    salaryAbroad: "$40k – $100k",
    minSignals: { VERBAL: 70, DISCIPLINE: 60 }
  },

  /* ───────────────── LAW & LEGAL ───────────────── */
  {
    id: "LAW_LEGAL",
    name: "Law & Legal Studies",
    category: "Legal",
    allowedStreams: ["Any"],
    durationYears: "5",
    costLevel: "MEDIUM–HIGH",
    roles: [
      "Corporate Lawyer","Judge","Legal Advisor","Litigator"
    ],
    rolesAbroad: [
      "International Lawyer","Compliance Officer"
    ],
    exams: ["CLAT","AILET"],
    feesIndia: "₹5L – ₹15L",
    feesAbroad: "$120k – $300k",
    salaryIndia: "₹6 – ₹25+ LPA",
    salaryAbroad: "$90k – $220k",
    minSignals: { VERBAL: 80, COGNITIVE: 70 }
  },

  /* ───────────────── FOUNDATION & SKILL PATH ───────────────── */
  {
    id: "FOUNDATION_PATH",
    name: "Foundation & Skill Exploration",
    category: "General",
    allowedStreams: ["Any"],
    durationYears: "0.5 – 2",
    costLevel: "LOW",
    roles: [
      "Skill-based Training",
      "Vocational Courses",
      "Entry-level Jobs",
      "Apprenticeships",
      "Short-term Certifications"
    ],
    rolesAbroad: ["Entry-level Workforce"],
    exams: ["None"],
    feesIndia: "₹10k – ₹1L",
    feesAbroad: "Minimal",
    salaryIndia: "₹1.5 – ₹4 LPA",
    salaryAbroad: "Varies",
    minSignals: { INTEREST: 40 }
  }
];

export default careers;
