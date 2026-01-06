// assessment/signal.normalizer.js

/**
 * Converts raw signals to normalized (0–100)
 */
export const normalizeSignals = (rawSignals) => {
  const normalized = {};

  for (const key in rawSignals) {
    const { score, max } = rawSignals[key];
    normalized[key] =
      max === 0 ? 0 : Number(((score / max) * 100).toFixed(2));
  }

  return normalized;
};
