// models/StudentProfile.model.js

import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    // ─────────────────────────────
    // BASIC IDENTITY
    // ─────────────────────────────
    studentId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true
    },
    phoneNumber:{
      type:Number,
      required:true
    },
    openToAbroad:{
      type:Boolean,
      required:true,
      
    },

    age: {
      type: Number,
      required: true,
      min: 12,
      max: 30
    },

    currentClass: {
      type: String,
      enum: [
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
        "Dropper",
        "Undergraduate"
      ],
      required: true
    },

    stream: {
      type: String,
      enum: ["Science", "Commerce", "Arts", "Undecided"],
      required: true
    },

    // ─────────────────────────────
    // FINANCIAL REALITY
    // ─────────────────────────────
    familyAnnualBudget: {
      type: String,
      enum: [
        "< 1 Lakh",
        "1–3 Lakh",
        "3–6 Lakh",
        "6–10 Lakh",
        "> 10 Lakh"
      ],
      required: true
    },

    educationLoanComfort: {
      type: String,
      enum: ["No", "Maybe", "Yes"],
      required: true
    },

    coachingAffordability: {
      type: Boolean,
      required: true
    },

    // ─────────────────────────────
    // ASSESSMENT SIGNAL OUTPUTS (0–100)
    // ─────────────────────────────
    assessmentSignals: {
      cognitive: { type: Number, min: 0, max: 100, required: true },
      numeracy: { type: Number, min: 0, max: 100, required: true },
      academic: { type: Number, min: 0, max: 100, required: true },
      verbal: { type: Number, min: 0, max: 100, required: true },
      interest: { type: Number, min: 0, max: 100, required: true },
      discipline: { type: Number, min: 0, max: 100, required: true },
      risk: { type: Number, min: 0, max: 100, required: true },
      finance: { type: Number, min: 0, max: 100, required: true }
    },

    globalScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },

    assessmentVersion: {
      type: String,
      default: "v2.0"
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);
