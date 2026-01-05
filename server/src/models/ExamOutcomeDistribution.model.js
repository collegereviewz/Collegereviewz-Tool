import mongoose from "mongoose";

const examOutcomeDistributionSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamCore",
      required: true,
      unique: true,
      index: true,
    },

    clearingPercent: {
      type: Number,
      // % of candidates who clear any meaningful stage
    },

    topTierPercent: {
      type: Number,
      // IAS / IIT Bombay / AIIMS Delhi / IIM BLACKI / Tier-1
    },

    midTierPercent: {
      type: Number,
      // NIT / New IIM / State PSU / Mid-tier college
    },

    lowTierPercent: {
      type: Number,
      // Low ROI colleges, marginal outcomes, weak placements
    },

    dropoutOrExitPercent: {
      type: Number,
      // Exit, pivot, unemployment, waiting, churn
    },

    notes: {
      type: String,
      // Optional clarifications:
      // "Includes post-exam fee shock exits"
      // "Dropout includes private college churn"
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ExamOutcomeDistribution",
  examOutcomeDistributionSchema
);
