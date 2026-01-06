const questionnaireDefinition = [
  // ================= SECTION A: Cognitive & Logical (Q1–Q12) =================
  {
    id: "Q1",
    section: "COGNITIVE",
    type: "mcq",
    text: "2 → 6 → 18 → 54 → ?",
    options: ["72", "108", "162", "216"],
    correctOption: 2
  },
  {
    id: "Q2",
    section: "COGNITIVE",
    type: "mcq",
    text: "Odd one out",
    options: ["Square", "Circle", "Triangle", "Cube"],
    correctOption: 3
  },
  {
    id: "Q3",
    section: "COGNITIVE",
    type: "mcq",
    text: "Book : Reading :: Food : ?",
    options: ["Cooking", "Eating", "Buying", "Storing"],
    correctOption: 1
  },
  {
    id: "Q4",
    section: "COGNITIVE",
    type: "mcq",
    text: "A person walks 10m north, then 10m east. Distance from start?",
    options: ["10 m", "15 m", "20 m", "√200 m"],
    correctOption: 3
  },
  {
    id: "Q5",
    section: "COGNITIVE",
    type: "mcq",
    text: "All doctors are graduates. Some graduates are teachers. Which is true?",
    options: [
      "All teachers are doctors",
      "Some teachers may be doctors",
      "No teacher is a doctor",
      "All graduates are doctors"
    ],
    correctOption: 1
  },
  {
    id: "Q6",
    section: "COGNITIVE",
    type: "mcq",
    text: "If CAT = DBU, then DOG = ?",
    options: ["EPH", "DPH", "EOG", "CPH"],
    correctOption: 0
  },
  {
    id: "Q7",
    section: "COGNITIVE",
    type: "mcq",
    text: "3, 6, 11, 18, ?",
    options: ["25", "27", "29", "31"],
    correctOption: 2
  },
  {
    id: "Q8",
    section: "COGNITIVE",
    type: "mcq",
    text:
      "Heavy rain causes flooding. Flooding causes traffic disruption. Heavy rain will cause?",
    options: [
      "Traffic fines",
      "Traffic disruption",
      "Road repair",
      "Fewer vehicles"
    ],
    correctOption: 1
  },
  {
    id: "Q9",
    section: "COGNITIVE",
    type: "mcq",
    text: "To find area of rectangle, which is sufficient?",
    options: ["Length", "Breadth", "Length & Breadth", "Perimeter"],
    correctOption: 2
  },
  {
    id: "Q10",
    section: "COGNITIVE",
    type: "mcq",
    text: "Probability of getting head in one coin toss?",
    options: ["0", "1", "1/2", "2"],
    correctOption: 2
  },
  {
    id: "Q11",
    section: "COGNITIVE",
    type: "mcq",
    text: "If ▲ = 3 and ■ = 4, what is ▲▲■?",
    options: ["10", "11", "13", "14"],
    correctOption: 1
  },
  {
    id: "Q12",
    section: "COGNITIVE",
    type: "mcq",
    text: "Monday is coded as 1. Sunday will be?",
    options: ["5", "6", "7", "8"],
    correctOption: 2
  },

  // ================= SECTION B: Quantitative (Q13–Q20) =================
  {
    id: "Q13",
    section: "NUMERACY",
    type: "mcq",
    text: "10% of 500 = ?",
    options: ["25", "50", "100", "150"],
    correctOption: 1
  },
  {
    id: "Q14",
    section: "NUMERACY",
    type: "mcq",
    text: "CP = ₹200, Loss = 10%. SP = ?",
    options: ["180", "190", "210", "220"],
    correctOption: 0
  },
  {
    id: "Q15",
    section: "NUMERACY",
    type: "mcq",
    text: "Ratio of 2:3, total = 25. Bigger part?",
    options: ["10", "12", "15", "18"],
    correctOption: 2
  },
  {
    id: "Q16",
    section: "NUMERACY",
    type: "mcq",
    text: "Average of 4, 6, 10?",
    options: ["6", "7", "8", "9"],
    correctOption: 1
  },
  {
    id: "Q17",
    section: "NUMERACY",
    type: "mcq",
    text: "If one job takes 10 days, two people will take?",
    options: ["2 days", "5 days", "10 days", "20 days"],
    correctOption: 1
  },
  {
    id: "Q18",
    section: "NUMERACY",
    type: "mcq",
    text: "Monthly income ₹30,000, expenses ₹24,000. Savings?",
    options: ["4000", "5000", "6000", "10000"],
    correctOption: 2
  },
  {
    id: "Q19",
    section: "NUMERACY",
    type: "mcq",
    text: "₹1000 at 10% simple interest for 1 year = ?",
    options: ["100", "1100", "1010", "900"],
    correctOption: 0
  },
  {
    id: "Q20",
    section: "NUMERACY",
    type: "mcq",
    text: "₹3,50,000 per year × 4 years ≈",
    options: ["10 lakh", "12 lakh", "14 lakh", "16 lakh"],
    correctOption: 2
  },

  // ================= SECTION C: Academic Readiness (Q21–Q30) =================
  {
    id: "Q21",
    section: "ACADEMIC",
    type: "mcq",
    text: "Why does sweating cool the body?",
    options: [
      "Blocks heat",
      "Evaporation absorbs heat",
      "Blood flow reduces",
      "Toxins removed"
    ],
    correctOption: 1
  },
  {
    id: "Q22",
    section: "ACADEMIC",
    type: "mcq",
    text: "Which travels fastest?",
    options: ["Sound", "Light", "Air", "Water"],
    correctOption: 1
  },
  {
    id: "Q23",
    section: "ACADEMIC",
    type: "mcq",
    text: "pH < 7 means substance is:",
    options: ["Neutral", "Acidic", "Basic", "Salt"],
    correctOption: 1
  },
  {
    id: "Q24",
    section: "ACADEMIC",
    type: "mcq",
    text: "Plants prepare food using:",
    options: ["Oxygen", "Chlorophyll", "Nitrogen", "Roots"],
    correctOption: 1
  },
  {
    id: "Q25",
    section: "ACADEMIC",
    type: "mcq",
    text: "Area of square side 4 = ?",
    options: ["8", "12", "16", "20"],
    correctOption: 2
  },
  {
    id: "Q26",
    section: "ACADEMIC",
    type: "mcq",
    text: "Profit = ?",
    options: ["SP − CP", "CP − SP", "SP × CP", "SP ÷ CP"],
    correctOption: 0
  },
  {
    id: "Q27",
    section: "ACADEMIC",
    type: "mcq",
    text: "Demand increases when price:",
    options: ["Increases", "Decreases", "Constant", "Unknown"],
    correctOption: 1
  },
  {
    id: "Q28",
    section: "ACADEMIC",
    type: "mcq",
    text: "A rule applies equally to all citizens. This shows:",
    options: ["Freedom", "Equality", "Power", "Authority"],
    correctOption: 1
  },
  {
    id: "Q29",
    section: "ACADEMIC",
    type: "mcq",
    text:
      "If population increases faster than jobs, unemployment will:",
    options: ["Decrease", "Remain same", "Increase", "Disappear"],
    correctOption: 2
  },
  {
    id: "Q30",
    section: "ACADEMIC",
    type: "mcq",
    text: "Court interprets law →",
    options: ["Legislature", "Judiciary", "Executive", "Police"],
    correctOption: 1
  },

  // ================= SECTION D: Verbal (Q31–Q36) =================
  {
    id: "Q31",
    section: "VERBAL",
    type: "mcq",
    text: "Resilience means:",
    options: ["Weakness", "Persistence", "Fear", "Delay"],
    correctOption: 1
  },
  {
    id: "Q32",
    section: "VERBAL",
    type: "mcq",
    text: "Success depends more on ___ than luck.",
    options: ["Speed", "Consistency", "Pressure", "Chance"],
    correctOption: 1
  },
  {
    id: "Q33",
    section: "VERBAL",
    type: "mcq",
    text: "Error in sentence: “He don’t like exams.”",
    options: ["He", "don’t", "like", "exams"],
    correctOption: 1
  },
  {
    id: "Q34",
    section: "VERBAL",
    type: "mcq",
    text:
      "All engineers are graduates. Ram is an engineer. Ram is:",
    options: ["Doctor", "Graduate", "Teacher", "Student"],
    correctOption: 1
  },
  {
    id: "Q35",
    section: "VERBAL",
    type: "mcq",
    text:
      "If hard work increases skill, skill increases confidence. Hard work increases:",
    options: ["Luck", "Confidence", "Stress", "Risk"],
    correctOption: 1
  },
  {
    id: "Q36",
    section: "VERBAL",
    type: "mcq",
    text: "Best summary: Practice daily improves performance gradually.",
    options: [
      "Practice is boring",
      "Daily effort builds improvement",
      "Performance is fixed",
      "Improvement is fast"
    ],
    correctOption: 1
  },

  // ================= SECTION E: Interest (Q37–Q44) =================
  {
    id: "Q37",
    section: "INTEREST",
    type: "preference",
    text: "Less tiring daily task?",
    options: [
      { label: "Solving numbers", score: 0.9 },
      { label: "Reading & summarizing", score: 0.7 },
      { label: "Managing people", score: 0.6 },
      { label: "Observing experiments", score: 0.8 }
    ]
  },
  {
    id: "Q38",
    section: "INTEREST",
    type: "preference",
    text: "Prefer work schedule?",
    options: [
      { label: "Fixed routine", score: 0.4 },
      { label: "Flexible schedule", score: 0.8 }
    ]
  },
  {
    id: "Q39",
    section: "INTEREST",
    type: "preference",
    text: "Prefer working with?",
    options: [
      { label: "Data", score: 0.8 },
      { label: "People", score: 0.6 }
    ]
  },
  {
    id: "Q40",
    section: "INTEREST",
    type: "preference",
    text: "Work preference?",
    options: [
      { label: "Desk work", score: 0.7 },
      { label: "Field work", score: 0.6 }
    ]
  },
  {
    id: "Q41",
    section: "INTEREST",
    type: "preference",
    text: "Prefer learning by?",
    options: [
      { label: "Books", score: 0.6 },
      { label: "Doing", score: 0.9 }
    ]
  },
  {
    id: "Q42",
    section: "INTEREST",
    type: "preference",
    text: "Prefer role?",
    options: [
      { label: "Teaching", score: 0.7 },
      { label: "Building", score: 0.9 }
    ]
  },
  {
    id: "Q43",
    section: "INTEREST",
    type: "preference",
    text: "Work style?",
    options: [
      { label: "Solo work", score: 0.6 },
      { label: "Team work", score: 0.8 }
    ]
  },
  {
    id: "Q44",
    section: "INTEREST",
    type: "preference",
    text: "Preferred outcomes?",
    options: [
      { label: "Predictable", score: 0.4 },
      { label: "Uncertain but high reward", score: 0.9 }
    ]
  },

  // ================= SECTION F: Discipline (Q45–Q52) =================
  {
    id: "Q45",
    section: "DISCIPLINE",
    type: "scenario",
    text: "Slow progress for 2 months, you:",
    options: [
      { label: "Quit", score: 0.1 },
      { label: "Change goal", score: 0.4 },
      { label: "Adjust strategy", score: 1.0 },
      { label: "Ignore", score: 0.2 }
    ]
  },
  {
    id: "Q46",
    section: "DISCIPLINE",
    type: "scenario",
    text: "Strict routine makes you feel:",
    options: [
      { label: "Trapped", score: 0.2 },
      { label: "Disciplined", score: 1.0 },
      { label: "Angry", score: 0.3 },
      { label: "Confused", score: 0.4 }
    ]
  },
  {
    id: "Q47",
    section: "DISCIPLINE",
    type: "scenario",
    text: "Exam pressure makes you:",
    options: [
      { label: "Panic", score: 0.2 },
      { label: "Freeze", score: 0.3 },
      { label: "Focus", score: 1.0 },
      { label: "Avoid", score: 0.1 }
    ]
  },
  {
    id: "Q48",
    section: "DISCIPLINE",
    type: "scenario",
    text: "If you fail once:",
    options: [
      { label: "Quit", score: 0.1 },
      { label: "Blame others", score: 0.2 },
      { label: "Reflect & retry", score: 1.0 },
      { label: "Ignore", score: 0.3 }
    ]
  },
  {
    id: "Q49",
    section: "DISCIPLINE",
    type: "scenario",
    text: "Daily consistency for 1 year seems:",
    options: [
      { label: "Impossible", score: 0.1 },
      { label: "Very hard", score: 0.4 },
      { label: "Manageable", score: 1.0 },
      { label: "Easy", score: 0.6 }
    ]
  },
  {
    id: "Q50",
    section: "DISCIPLINE",
    type: "scenario",
    text: "When tired, you:",
    options: [
      { label: "Stop completely", score: 0.2 },
      { label: "Take break & continue", score: 1.0 },
      { label: "Delay endlessly", score: 0.3 },
      { label: "Quit", score: 0.1 }
    ]
  },
  {
    id: "Q51",
    section: "DISCIPLINE",
    type: "scenario",
    text: "Feedback usually makes you:",
    options: [
      { label: "Defensive", score: 0.3 },
      { label: "Improve", score: 1.0 },
      { label: "Angry", score: 0.2 },
      { label: "Ignore", score: 0.1 }
    ]
  },
  {
    id: "Q52",
    section: "DISCIPLINE",
    type: "scenario",
    text: "Long exams make you:",
    options: [
      { label: "Anxious", score: 0.4 },
      { label: "Bored", score: 0.3 },
      { label: "Calm", score: 1.0 },
      { label: "Exhausted", score: 0.5 }
    ]
  },

  // ================= SECTION G: Risk (Q53–Q60) =================
  {
    id: "Q53",
    section: "RISK",
    type: "scenario",
    text: "Miss cutoff narrowly:",
    options: [
      { label: "Quit field", score: 0.1 },
      { label: "Repeat year", score: 0.4 },
      { label: "Take related backup", score: 1.0 },
      { label: "Decide later", score: 0.3 }
    ]
  },
  {
    id: "Q54",
    section: "RISK",
    type: "scenario",
    text: "Budget issue mid-course:",
    options: [
      { label: "Drop out", score: 0.1 },
      { label: "Switch to lower cost", score: 1.0 },
      { label: "Continue blindly", score: 0.2 },
      { label: "Pause forever", score: 0.1 }
    ]
  },
  {
    id: "Q55",
    section: "RISK",
    type: "scenario",
    text: "Family pressure vs interest:",
    options: [
      { label: "Fight", score: 0.3 },
      { label: "Follow blindly", score: 0.1 },
      { label: "Discuss & balance", score: 1.0 },
      { label: "Avoid", score: 0.2 }
    ]
  },
  {
    id: "Q56",
    section: "RISK",
    type: "scenario",
    text: "Rank uncertainty makes you:",
    options: [
      { label: "Panic", score: 0.2 },
      { label: "Overconfident", score: 0.3 },
      { label: "Prepare backups", score: 1.0 },
      { label: "Ignore", score: 0.1 }
    ]
  },
  {
    id: "Q57",
    section: "RISK",
    type: "scenario",
    text: "Course harder than expected:",
    options: [
      { label: "Quit", score: 0.1 },
      { label: "Struggle silently", score: 0.3 },
      { label: "Seek help & adapt", score: 1.0 },
      { label: "Blame system", score: 0.2 }
    ]
  },
  {
    id: "Q58",
    section: "RISK",
    type: "scenario",
    text: "Job delayed after graduation:",
    options: [
      { label: "Panic", score: 0.2 },
      { label: "Skill up", score: 1.0 },
      { label: "Give up", score: 0.1 },
      { label: "Wait only", score: 0.3 }
    ]
  },
  {
    id: "Q59",
    section: "RISK",
    type: "scenario",
    text: "Mid-course regret:",
    options: [
      { label: "Quit instantly", score: 0.1 },
      { label: "Reflect & realign", score: 1.0 },
      { label: "Ignore feelings", score: 0.3 },
      { label: "Blame others", score: 0.2 }
    ]
  },
  {
    id: "Q60",
    section: "RISK",
    type: "scenario",
    text: "Backup choice feels:",
    options: [
      { label: "Failure", score: 0.1 },
      { label: "Shame", score: 0.2 },
      { label: "Safety net", score: 1.0 },
      { label: "Waste", score: 0.1 }
    ]
  }
];

export default questionnaireDefinition;
