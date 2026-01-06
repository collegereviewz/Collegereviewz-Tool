import questionnaireDefinition from "./questionnaire.definition.js";

/**
 * Builds raw signal scores from answers
 * Output:
 * {
 *   COGNITIVE: { score, max },
 *   NUMERACY: { score, max },
 *   ...
 * }
 */
export const scoreSignals = (answers) => {
  const rawSignals = {};

  // Initialize buckets with correct max
  questionnaireDefinition.forEach((q) => {
    if (!rawSignals[q.section]) {
      rawSignals[q.section] = { score: 0, max: 0 };
    }

    // MCQ max = 1
    if (q.type === "mcq") {
      rawSignals[q.section].max += 1;
    }

    // Scenario / preference max = highest option score
    if (q.type === "preference" || q.type === "scenario") {
      const maxOptionScore = Math.max(
        ...q.options.map((o) => o.score)
      );
      rawSignals[q.section].max += maxOptionScore;
    }
  });

  // Score answers
  questionnaireDefinition.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined) return;

    if (q.type === "mcq") {
      if (userAnswer === q.correctOption) {
        rawSignals[q.section].score += 1;
      }
    }

    if (q.type === "preference" || q.type === "scenario") {
      const selected = q.options[userAnswer];
      if (selected && typeof selected.score === "number") {
        rawSignals[q.section].score += selected.score;
      }
    }
  });

  return rawSignals;
};
