// services/report.generator.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/* ───────────────── UTIL ───────────────── */

const safe = (v) => (Array.isArray(v) ? v : []);

/* ───────────────── FONT & ASSETS ───────────────── */

const FONT_PATH = path.join(
  process.cwd(),
  "src/assets/fonts/NotoSans-Regular.ttf"
);
const LOGO_PATH = path.join(process.cwd(), "src/assets/basiclogo1.png");

/* ───────────────── PAGE DECOR ───────────────── */

const drawPageBackground = (doc, width, height) => {
  doc.rect(0, 0, width, height).fillColor("#F0F7FB").fill();
  doc.rect(0, 0, width, 8).fillColor("#2563EB").fill();
};

const drawHeader = (doc, margins, width, height) => {
  doc.rect(0, 0, width, 130).fillColor("#E8F4F8").fill();
  doc.rect(0, 125, width, 4).fillColor("#2563EB").fill();

  if (fs.existsSync(LOGO_PATH)) {
    doc.image(LOGO_PATH, margins.left, 15, { width: 50 });
  }

  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .fillColor("#1E3A8A")
    .text("Career Assessment Handbook", margins.left + 70, 20, {
      width: width - margins.left - margins.right - 70,
      align: "left",
    });

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("#475569")
    .text("Your Path to Success Starts Here", margins.left + 70, 52, {
      width: width - margins.left - margins.right - 70,
      align: "left",
    });
};

const drawWatermark = (doc, width, height) => {
  doc
    .save()
    .rotate(-35, { origin: [width / 2, height / 2] })
    .fontSize(60)
    .fillColor("#CBD5F5")
    .fillOpacity(0.12) // slightly dark, still subtle
    .text("CollegeReviewz", width / 6, height / 2, { align: "center" })
    .restore();
};

const addNewPage = (doc, margins, width, height) => {
  doc.addPage();
  drawPageBackground(doc, width, height);
  drawHeader(doc, margins, width, height);
  drawWatermark(doc, width, height);
  doc.y = 150;
};

const needsNewPage = (doc, height, spaceNeeded = 60) => {
  return doc.y + spaceNeeded > height - 50;
};

/* ───────────────── MAIN GENERATOR ───────────────── */

export const generateAssessmentReport = ({
  studentProfile,
  signals,
  careers,
}) => {
  const doc = new PDFDocument({ size: "A4", margin: 40, bufferPages: true });
  const { width, height, margins } = doc.page;

  const filePath = path.join(
    "reports",
    `career-report-${studentProfile.studentId}.pdf`
  );

  fs.mkdirSync("reports", { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  /* ═════════ PAGE 1: TITLE & STUDENT INFO ═════════ */

  drawPageBackground(doc, width, height);
  drawHeader(doc, margins, width, height);
  drawWatermark(doc, width, height);

  doc.y = 150;

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .fillColor("#1E3A8A")
    .text("Student Profile");

  doc.moveDown(0.35);

  doc
    .fontSize(11)
    .font("Helvetica")
    .fillColor("#334155");

  doc.text(`Student ID: ${studentProfile.studentId}`);
  doc.text(`Class: ${studentProfile.currentClass}`);
  doc.text(`Stream: ${studentProfile.stream}`);
  doc.text(`Family Budget: ${studentProfile.familyAnnualBudget}`);

  doc.moveDown(0.7);

  doc
    .fontSize(10)
    .fillColor("#475569")
    .text(
      "Welcome to your personalized Career Assessment Handbook. This document has been tailored based on your aptitude assessment and personal profile to guide you towards the most suitable career paths."
    );

  /* ═════════ PAGE 2: APTITUDE (WITH HEADER + LOGO + WATERMARK) ═════════ */

  addNewPage(doc, margins, width, height);

  const blockWidth = 400;
  const blockStartX = (width - blockWidth) / 2;
  const labelWidth = 160;
  const gapWidth = 10;
  const barWidth = blockWidth - labelWidth - gapWidth;

  doc.y = 160;

  doc
    .fontSize(13)
    .font("Helvetica-Bold")
    .fillColor("#1E3A8A")
    .text("Your Aptitude Breakdown", {
      align: "center",
      width,
    });

  doc.moveDown(0.8);

  Object.entries(signals).forEach(([key, value]) => {
    const score = parseFloat(value);
    const barLength = (score / 100) * barWidth;

    if (needsNewPage(doc, height, 40)) {
      addNewPage(doc, margins, width, height);
      doc.y = 160;
      doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Your Aptitude Breakdown", {
          align: "center",
          width,
        });
      doc.moveDown(0.8);
    }

    const currentY = doc.y;

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor("#1E3A8A")
      .text(`${key.toUpperCase()}: ${value}/100`, blockStartX, currentY, {
        width: labelWidth,
        align: "left",
      });

    const barX = blockStartX + labelWidth + gapWidth;
    const barY = currentY + 4;

    doc
      .rect(barX, barY, barWidth, 9)
      .fillColor("#D1D5DB")
      .fill();

    let barColor = "#10B981";
    if (score < 60) barColor = "#F59E0B";
    if (score < 40) barColor = "#EF4444";

    doc
      .rect(barX, barY, barLength, 9)
      .fillColor(barColor)
      .fill();

    doc
      .fontSize(8)
      .font("Helvetica-Bold")
      .fillColor("#FFFFFF")
      .text(`${value}%`, barX + barLength - 22, barY + 1, {
        width: 22,
        align: "center",
      });

    doc.y = currentY + 20;
  });

  /* ═════════ CAREER PAGES ═════════ */

  careers.forEach((career, index) => {
    addNewPage(doc, margins, width, height);

    const tierColors = {
      GREEN: "#10B981",
      YELLOW: "#F59E0B",
      ORANGE: "#F97316",
      RED: "#EF4444",
    };
    const tierColor = tierColors[career.tier] || "#3B82F6";

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor("#1E3A8A")
      .text(`${index + 1}. ${career.name}`, { underline: true });

    doc.moveDown(0.35);

    doc
      .rect(margins.left, doc.y - 3, 95, 16)
      .fillColor(tierColor)
      .fill();

    doc
      .fontSize(9)
      .font("Helvetica-Bold")
      .fillColor("#FFFFFF")
      .text(`Tier: ${career.tier}`, margins.left + 8, doc.y + 1);

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor("#1E3A8A")
      .text(`Compatibility Score: ${career.compatibilityScore}%`);

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor("#1E3A8A")
      .text("Career Options in India:");

    doc.moveDown(0.2);

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#334155");

    safe(career.roles).forEach((r) => {
      if (needsNewPage(doc, height, 30)) {
        addNewPage(doc, margins, width, height);
      }
      doc.text(`• ${r}`);
    });

    doc.moveDown(0.35);

    if (safe(career.rolesAbroad).length) {
      if (needsNewPage(doc, height, 60)) {
        addNewPage(doc, margins, width, height);
      }

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Career Options Abroad:");

      doc.moveDown(0.2);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#334155");

      safe(career.rolesAbroad).forEach((r) => {
        if (needsNewPage(doc, height, 30)) {
          addNewPage(doc, margins, width, height);
        }
        doc.text(`• ${r}`);
      });

      doc.moveDown(0.35);
    }

    if (safe(career.bestInstitutesIndia).length) {
      if (needsNewPage(doc, height, 60)) {
        addNewPage(doc, margins, width, height);
      }

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Top Institutes (India):");

      doc.moveDown(0.2);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#334155");

      safe(career.bestInstitutesIndia).forEach((i) => {
        if (needsNewPage(doc, height, 30)) {
          addNewPage(doc, margins, width, height);
        }
        doc.text(`• ${i}`);
      });

      doc.moveDown(0.35);
    }

    if (safe(career.bestInstitutesAbroad).length) {
      if (needsNewPage(doc, height, 60)) {
        addNewPage(doc, margins, width, height);
      }

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Top Institutes (Abroad):");

      doc.moveDown(0.2);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#334155");

      safe(career.bestInstitutesAbroad).forEach((i) => {
        if (needsNewPage(doc, height, 30)) {
          addNewPage(doc, margins, width, height);
        }
        doc.text(`• ${i}`);
      });

      doc.moveDown(0.35);
    }

    if (needsNewPage(doc, height, 60)) {
      addNewPage(doc, margins, width, height);
    }

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor("#1E3A8A")
      .text("Estimated Fees:");

    doc.moveDown(0.2);

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#334155");

    if (career.feesIndia) {
      doc.text(`India: ${career.feesIndia}`);
    } else {
      doc.text(`India: Varies`);
    }

    if (career.feesAbroad) {
      doc.text(`Abroad: ${career.feesAbroad}`);
    }

    doc.moveDown(0.35);

    if (career.salaryIndia || career.salaryAbroad) {
      if (needsNewPage(doc, height, 60)) {
        addNewPage(doc, margins, width, height);
      }

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Average Salary:");

      doc.moveDown(0.2);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#334155");

      if (career.salaryIndia) {
        doc.text(`India: ${career.salaryIndia}`);
      }
      if (career.salaryAbroad) {
        doc.text(`Abroad: ${career.salaryAbroad}`);
      }

      doc.moveDown(0.35);
    }

    if (safe(career.roadmap).length) {
      if (needsNewPage(doc, height, 80)) {
        addNewPage(doc, margins, width, height);
      }

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Recommended Roadmap:");

      doc.moveDown(0.2);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#334155");

      safe(career.roadmap).forEach((s, i) => {
        if (needsNewPage(doc, height, 30)) {
          addNewPage(doc, margins, width, height);
        }
        doc.text(`${i + 1}. ${s}`);
      });

      doc.moveDown(0.35);
    }

    if (safe(career.whyRecommended).length) {
      if (needsNewPage(doc, height, 80)) {
        addNewPage(doc, margins, width, height);
      }

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Why Recommended:");

      doc.moveDown(0.2);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#334155");

      safe(career.whyRecommended).forEach((r) => {
        if (needsNewPage(doc, height, 30)) {
          addNewPage(doc, margins, width, height);
        }
        doc.text(`• ${r}`);
      });

      doc.moveDown(0.35);
    }

    if (safe(career.whyNotRecommended).length) {
      if (needsNewPage(doc, height, 80)) {
        addNewPage(doc, margins, width, height);
      }

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#1E3A8A")
        .text("Why This May NOT Be Ideal:");

      doc.moveDown(0.2);

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#334155");

      safe(career.whyNotRecommended).forEach((r) => {
        if (needsNewPage(doc, height, 30)) {
          addNewPage(doc, margins, width, height);
        }
        doc.text(`• ${r}`);
      });
    }
  });

  /* ═════════ FINAL NOTE PAGE (WITH HEADER & LEFT-SHIFTED CONTENT) ═════════ */

  addNewPage(doc, margins, width, height); // header + logo + watermark

  const contentAreaStart = 150;
  const contentAreaEnd = height - 50;
  const contentAreaHeight = contentAreaEnd - contentAreaStart;
  const verticalCenter = contentAreaStart + contentAreaHeight / 2;

  // baseline Y for content
  let y = verticalCenter - 120;

  // slight horizontal shift to the left
  const contentWidth = width - 2 * margins.left;
  const shiftLeft = 40; // move 40px left from full center
  const contentX = margins.left + shiftLeft;
  const availableWidth = contentWidth - shiftLeft * 2;

  // blue line
  const lineWidth = 100;
  const lineCenterX = width / 2 - lineWidth / 2 - 20; // also slightly left
  doc.rect(lineCenterX, y, lineWidth, 2).fillColor("#2563EB").fill();

  y += 25;

  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .fillColor("#1E3A8A")
    .text("Final Note", contentX, y, {
      width: availableWidth,
      align: "center",
    });

  y += 35;

  doc
    .fontSize(11)
    .font("Helvetica")
    .fillColor("#334155")
    .text(
      "This handbook is a decision-support tool — not a verdict.\n\n" +
        "Careers evolve with effort, exposure, and adaptability.\n\n" +
        "Use this report as a compass — not a cage.\n\n" +
        "Remember: Your passion, dedication, and continuous learning matter more than any assessment score. This guide is here to inspire and guide, not limit your potential.",
      contentX,
      y,
      {
        width: availableWidth,
        align: "center",
      }
    );

  y += 120;

  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .fillColor("#2563EB")
    .text("Keep exploring. Keep growing. Keep dreaming!", contentX, y, {
      width: availableWidth,
      align: "center",
    });

  doc.end();
  return filePath;
};
