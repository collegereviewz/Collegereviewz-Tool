import { scoreSignals } from "../signal.scorer.js";
import { normalizeSignals } from "../signal.normalizer.js";

// mock answers (indexes of selected options)
const answers = {
  Q1: 2,
  Q2: 3,
  Q3: 1,
  Q4: 3,
  Q5: 1,
  Q6: 0,
  Q7: 2,
  Q8: 1,
  Q9: 2,
  Q10: 2,
  Q11: 1,
  Q12: 2,

  Q13: 1,
  Q14: 0,
  Q15: 2,
  Q16: 1,
  Q17: 1,
  Q18: 2,
  Q19: 0,
  Q20: 2,

  Q21: 1,
  Q22: 1,
  Q23: 1,
  Q24: 1,
  Q25: 2,
  Q26: 0,
  Q27: 1,
  Q28: 1,
  Q29: 2,
  Q30: 1,

  Q31: 1,
  Q32: 1,
  Q33: 1,
  Q34: 1,
  Q35: 1,
  Q36: 1,

  Q37: 0,
  Q38: 1,
  Q39: 0,
  Q40: 0,
  Q41: 1,
  Q42: 1,
  Q43: 1,
  Q44: 1,

  Q45: 2,
  Q46: 1,
  Q47: 2,
  Q48: 2,
  Q49: 2,
  Q50: 1,
  Q51: 1,
  Q52: 2,

  Q53: 2,
  Q54: 1,
  Q55: 2,
  Q56: 2,
  Q57: 2,
  Q58: 1,
  Q59: 1,
  Q60: 2
};

const rawSignals = scoreSignals(answers);
const normalizedSignals = normalizeSignals(rawSignals);

console.log("RAW SIGNALS:", rawSignals);
console.log("NORMALIZED SIGNALS:", normalizedSignals);
