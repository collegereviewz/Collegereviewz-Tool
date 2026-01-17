// services/report.generator.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// this points to: server/src/assets
const ASSETS_DIR = path.resolve(__dirname, "../assets");


/* ───────────────── UTIL ───────────────── */

const safe = (v) => (Array.isArray(v) ? v : []);

/* ───────────────── FONT & ASSETS ───────────────── */

const FONT_PATH = path.join(
  process.cwd(),
  "src/assets/fonts/NotoSans-Regular.ttf"
);
const LOGO_PATH = path.join(ASSETS_DIR, "basiclogo1.png");
const FRAMEWORK_IMG_PATH = path.join(
  process.cwd(),
  "src/assets/stream-framework.png"
);
// new professions illustration (webp in assets)
const PROFESSIONS_IMG_PATH = path.join(
  process.cwd(),
  "src/assets/professions.png"
);
const CAREER_IMAGE_MAP = {
  ENGINEERING_TECH: "engg.jpg",
  MEDICAL_HELATH: "medical.jpg",
  SCIENCE_AND_RESEARCH: "science.jpg",
  ARMED_FORCE: "armed.jpg",
  FINANCE_COMMERCE: "finance.jpg",
  ENTREPRENEURSHIP_STARTUP: "startup.jpg",
  HOSPITALITY_HOTEL: "hospitality.png",
  EDUCATION_TEACHING: "education.jpg",
  LAW_LEGAL: "law.jpg",
  FOUNDATION_PATH: "foundational.jpg",
};


/* ───────────────── COLOURS ───────────────── */

const PAGE_BG = "#F3F5F9";
const PRIMARY = "#2563EB";
const PRIMARY_DARK = "#1E3A8A";
const TEXT_MAIN = "#1F2933";
const TEXT_MUTED = "#6B7280";
const CARD_BG = "#FFFFFF";
const CARD_BORDER = "#E5E7EB";

/* ───────────────── PAGE DECOR ───────────────── */

const drawPageBackground = (doc, width, height) => {
  doc.rect(0, 0, width, height).fillColor(PAGE_BG).fill();
  doc.rect(0, 0, width, 6).fillColor(PRIMARY).fill();
};

const drawHeader = (doc, margins, width, height) => {
  const headerHeight = 90;
  doc
    .roundedRect(
      margins.left,
      18,
      width - margins.left - margins.right,
      headerHeight,
      8
    )
    .fillColor("#E4ECFF")
    .fill();

  if (fs.existsSync(LOGO_PATH)) {
    doc.image(LOGO_PATH, margins.left + 20, 30, {
      width: 55,        // ⬅ bigger logo
    });
  }

  const titleX = margins.left + 80;

  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .fillColor(PRIMARY_DARK)
    .text("Career Assessment Handbook", titleX, 30, {
      width: width - titleX - margins.right,
      align: "left",
    });

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor(TEXT_MUTED)
    .text("Your path to the right stream and careers", titleX, 60, {
      width: width - titleX - margins.right,
      align: "left",
    });

  doc
    .moveTo(margins.left + 80, 82)
    .lineTo(width - margins.right - 40, 82)
    .lineWidth(1.3)
    .strokeColor(PRIMARY)
    .stroke();
};

const drawWatermark = (doc, width, height) => {
  doc
    .save()
    .rotate(-35, { origin: [width / 2, height / 2] })
    .fontSize(56)
    .fillColor("#CBD5F5")
    .fillOpacity(0.12)
    .text("CollegeReviewz", width / 6, height / 2, { align: "center" })
    .restore()
    .fillOpacity(1);
};

const addNewPage = (doc, margins, width, height) => {
  doc.addPage();
  drawPageBackground(doc, width, height);
  drawHeader(doc, margins, width, height);
  drawWatermark(doc, width, height);
  doc.y = 120;
};

const needsNewPage = (doc, height, spaceNeeded = 60) => {
  return doc.y + spaceNeeded > height - 60;
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

  /* ═════════ PAGE 1: COVER + STUDENT CARD ═════════ */

  drawPageBackground(doc, width, height);
  drawHeader(doc, margins, width, height);
  drawWatermark(doc, width, height);

  const cardX = margins.left;
  const cardY = 130;
  const cardW = width - margins.left - margins.right;
  const cardH = 180;

  doc
    .roundedRect(cardX, cardY, cardW, cardH, 10)
    .fillColor(CARD_BG)
    .fill()
    .roundedRect(cardX, cardY, cardW, cardH, 10)
    .lineWidth(0.6)
    .strokeColor(CARD_BORDER)
    .stroke();

  doc.y = cardY + 20;
  doc.x = cardX + 24;

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor(PRIMARY_DARK)
    .text("Student Profile");

  doc.moveDown(0.6);

  doc
    .fontSize(11)
    .font("Helvetica")
    .fillColor(TEXT_MAIN)
    .text(`Student ID: ${studentProfile.studentId}`)
    .text(`Class: ${studentProfile.currentClass}`)
    .text(`Stream: ${studentProfile.stream}`)
    .text(`Family Budget: ${studentProfile.familyAnnualBudget}`);

  doc.moveDown(0.9);
  doc
    .fontSize(10)
    .fillColor(TEXT_MUTED)
    .text(
      "This report summarises your aptitude, interests and profile, and recommends suitable streams and careers so you can make confident academic decisions.",
      { width: cardW - 48 }
    );

  // professions illustration instead of black box
  const profCardY = cardY + cardH + 24;
  const profCardH = 150;

  doc
    .roundedRect(cardX, profCardY, cardW, profCardH, 10)
    .fillColor(CARD_BG)
    .fill()
    .roundedRect(cardX, profCardY, cardW, profCardH, 10)
    .lineWidth(0.6)
    .strokeColor(CARD_BORDER)
    .stroke();

  if (fs.existsSync(PROFESSIONS_IMG_PATH)) {
    doc.image(PROFESSIONS_IMG_PATH, cardX + 24, profCardY + 8, {
      width: cardW - 48,
      align: "center",
      valign: "center",
    });
  }

  /* ═════════ PAGE 2: FRAMEWORK ILLUSTRATION ═════════ */

  addNewPage(doc, margins, width, height);

  const fwCardX = margins.left;
  const fwCardY = 120;
  const fwCardW = width - margins.left - margins.right;
  const fwCardH = height - fwCardY - 80;

  doc
    .roundedRect(fwCardX, fwCardY, fwCardW, fwCardH, 10)
    .fillColor(CARD_BG)
    .fill()
    .roundedRect(fwCardX, fwCardY, fwCardW, fwCardH, 10)
    .lineWidth(0.6)
    .strokeColor(CARD_BORDER)
    .stroke();

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor(PRIMARY_DARK)
    .text("Assessment Framework", fwCardX + 24, fwCardY + 18);

  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor(TEXT_MUTED)
    .text(
      "Your report is based on four pillars: Personality, Orientation Style, Interest and Aptitude. Together, they provide a holistic view of your profile.",
      fwCardX + 24,
      fwCardY + 40,
      { width: fwCardW - 48 }
    );

  if (fs.existsSync(FRAMEWORK_IMG_PATH)) {
    doc.image(
      FRAMEWORK_IMG_PATH,
      fwCardX + 40,
      fwCardY + 80,
      {
        width: fwCardW - 80,
        align: "center",
      }
    );
  }

  const fwFooterY = fwCardY + fwCardH - 55;
  doc
    .roundedRect(fwCardX + 40, fwFooterY, fwCardW - 80, 40, 8)
    .fillColor("#1F2933")
    .fill();
  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor("#FFFFFF")
    .text(
      "Next is your aptitude snapshot, followed by detailed career paths aligned to your strengths.",
      fwCardX + 52,
      fwFooterY + 10,
      { width: fwCardW - 104, align: "center" }
    );

  /* ═════════ PAGE 3: APTITUDE CARD (FINANCE FIXED) ═════════ */

  addNewPage(doc, margins, width, height);

  const aptCardW = width - margins.left - margins.right;
  const aptCardX = margins.left;
  const aptCardY = 130;
  const aptCardH = 280; // slightly taller so last bar stays inside

  doc
    .roundedRect(aptCardX, aptCardY, aptCardW, aptCardH, 10)
    .fillColor(CARD_BG)
    .fill()
    .roundedRect(aptCardX, aptCardY, aptCardW, aptCardH, 10)
    .lineWidth(0.6)
    .strokeColor(CARD_BORDER)
    .stroke();

  doc.x = aptCardX + 24;
  doc.y = aptCardY + 18;

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor(PRIMARY_DARK)
    .text("Your Aptitude Snapshot");

  doc.moveDown(0.25);
  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor(TEXT_MUTED)
    .text(
      "Higher scores indicate stronger readiness in that area. Use this snapshot with your counsellor to decide focus areas."
    );

  const blockWidth = aptCardW - 48;
  const labelWidth = 170;
  const gapWidth = 16;
  const barWidth = blockWidth - labelWidth - gapWidth;
  const startX = aptCardX + 24;

  doc.y += 14;

  Object.entries(signals).forEach(([key, value]) => {
    const score = parseFloat(value || 0);
    const barLength = Math.max(0, Math.min(1, score / 100)) * barWidth;
    const currentY = doc.y;

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor(TEXT_MAIN)
      .text(`${key.toUpperCase()}`, startX, currentY, {
        width: labelWidth,
        align: "left",
      });

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(TEXT_MUTED)
      .text(`${value}/100`, startX, currentY + 11, {
        width: labelWidth,
        align: "left",
      });

    const barX = startX + labelWidth + gapWidth;
    const barY = currentY + 6;

    doc
      .roundedRect(barX, barY, barWidth, 9, 4)
      .fillColor("#E5E7EB")
      .fill();

    let barColor = "#16A34A";
    if (score < 70) barColor = "#F59E0B";
    if (score < 40) barColor = "#EF4444";

    doc
      .roundedRect(barX, barY, barLength, 9, 4)
      .fillColor(barColor)
      .fill();

    doc
      .fontSize(8)
      .font("Helvetica-Bold")
      .fillColor("#FFFFFF")
      .text(`${Math.round(score)}%`, barX + barLength - 24, barY + 1, {
        width: 24,
        align: "center",
      });

    doc.y = currentY + 26;
  });

  /* helper: draw tier LEGEND (scale) on every career page */
const drawTierScale = (yTop) => {
  const cardX = margins.left;
  const barW = width - margins.left - margins.right;
  const barH = 16;
  const radius = barH / 2;
  const segW = barW / 3;

  // background
  doc
    .roundedRect(cardX, yTop, barW, barH, radius)
    .fillColor("#E5E7EB")
    .fill();

  // GREEN – BEST
  doc
    .roundedRect(cardX, yTop, segW, barH, radius)
    .fillColor("#22C55E")
    .fill();

  // YELLOW – IDEAL
  doc
    .rect(cardX + segW, yTop, segW, barH)
    .fillColor("#EAB308")
    .fill();

  // RED – RISKY
  doc
    .roundedRect(cardX + segW * 2, yTop, segW, barH, radius)
    .fillColor("#EF4444")
    .fill();

  // labels
  doc
    .fontSize(9)
    .font("Helvetica-Bold")
    .fillColor("#FFFFFF")
    .text("GREEN – BEST", cardX, yTop + 3, { width: segW, align: "center" })
    .text("YELLOW – IDEAL", cardX + segW, yTop + 3, {
      width: segW,
      align: "center",
    })
    .text("RED – RISKY", cardX + segW * 2, yTop + 3, {
      width: segW,
      align: "center",
    });
};

  
  

  /* ═════════ CAREER PAGES: SCALE + IMAGE SPACE + CARDS ═════════ */

  careers.forEach((career, index) => {
    addNewPage(doc, margins, width, height);

    // tier scale at top of every career page
    drawTierScale(105);
    doc
  .fontSize(9)
  .font("Helvetica")
  .fillColor(TEXT_MUTED)
  .text(
    "Green indicates best-fit careers, Yellow indicates suitable options, and Red indicates higher risk paths.",
    margins.left,
    125,
    { width: width - margins.left - margins.right, align: "center" }
  );




    const cardX2 = margins.left;
    let cardY2 = 135;
    const cardW2 = width - margins.left - margins.right;
    const cardH2 = height - cardY2 - 80;
    const bandY = cardY2 + cardH2 - 70;


    doc
      .roundedRect(cardX2, cardY2, cardW2, cardH2, 10)
      .fillColor(CARD_BG)
      .fill()
      .roundedRect(cardX2, cardY2, cardW2, cardH2, 10)
      .lineWidth(0.6)
      .strokeColor(CARD_BORDER)
      .stroke();

    const innerX = cardX2 + 22;
    let y = cardY2 + 20;

    // optional career image in right white space (top-right)
//     const imageWidth = 140;
//     const imageHeight = 100;
//     const imageX = cardX2 + cardW2 - imageWidth - 22;
//     const imageY = y;

//     const source = (career.code || career.name || "").toUpperCase();

// const imageKey = Object.keys(CAREER_IMAGE_MAP).find(key =>
//   source.includes(key.split("_")[0])
// );

// const imageFile = imageKey ? CAREER_IMAGE_MAP[imageKey] : null;



//     if (imageFile) {
//       const imagePath = path.join(ASSETS_DIR, imageFile);
//       if (fs.existsSync(imagePath)) {
//         doc
//           .roundedRect(imageX, imageY, imageWidth, imageHeight, 8)
//           .fillColor("#F9FAFB")
//           .fill();
//         doc.image(imagePath, imageX + 4, imageY + 4, {
//           width: imageWidth - 8,
//           height: imageHeight - 8,
//           align: "center",
//           valign: "center",
//         });
//       }
//     }
    


    // title (full width, no side image anymore)
doc
.fontSize(15)
.font("Helvetica-Bold")
.fillColor(PRIMARY_DARK)
.text(career.name, innerX, y, {
  width: cardW2 - 44,
});

    // tier pill
    // const tierColors = {
    //   GREEN: "#22C55E",
    //   YELLOW: "#EAB308",
    //   ORANGE: "#FB923C",
    //   RED: "#EF4444",
    // };
    // const tierColor = tierColors[career.tier] || PRIMARY;
    // const pillText = `Tier: ${career.tier}`;
    // const pillWidth = doc.widthOfString(pillText) + 24;
    // const pillX = cardX2 + cardW2 - pillWidth - 22;
    // const pillY = imageY + imageHeight + 10;

    // doc
    //   .roundedRect(pillX, pillY, pillWidth, 18, 9)
    //   .fillColor(tierColor)
    //   .fill();
    // doc
    //   .fontSize(9)
    //   .font("Helvetica-Bold")
    //   .fillColor("#FFFFFF")
    //   .text(pillText, pillX, pillY + 4, {
    //     width: pillWidth,
    //     align: "center",
    //   });

    y += 26;

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor(TEXT_MUTED)
      .text(
        `Compatibility score: ${career.compatibilityScore}%`,
        innerX,
        y
      );

    y += 22;

    const colGap = 24;
    const colWidth =
      (cardW2 - 44 - colGap) / 2; // columns share remaining width

    // left column: roles
    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor(PRIMARY_DARK)
      .text("Career options (India)", innerX, y, { width: colWidth });

    doc
      .moveTo(innerX, y + 14)
      .lineTo(innerX + 80, y + 14)
      .lineWidth(0.8)
      .strokeColor(PRIMARY)
      .stroke();

    let yLeft = y + 20;

    doc
      .fontSize(9.5)
      .font("Helvetica")
      .fillColor(TEXT_MAIN);

    safe(career.roles).slice(0, 6).forEach((r) => {
      doc.text(`• ${r}`, innerX, yLeft, { width: colWidth });
      yLeft += 13;
    });

    if (safe(career.rolesAbroad).length) {
      yLeft += 6;
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor(PRIMARY_DARK)
        .text("Career options (Abroad)", innerX, yLeft, { width: colWidth });
      yLeft += 16;
      doc
        .fontSize(9.5)
        .font("Helvetica")
        .fillColor(TEXT_MAIN);
      safe(career.rolesAbroad).slice(0, 5).forEach((r) => {
        doc.text(`• ${r}`, innerX, yLeft, { width: colWidth });
        yLeft += 13;
      });
    }

    // right column: institutes
    let xRight = innerX + colWidth + colGap;
    let yRight = y;

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor(PRIMARY_DARK)
      .text("Top institutes (India)", xRight, yRight, {
        width: colWidth,
      });

    doc
      .moveTo(xRight, yRight + 14)
      .lineTo(xRight + 90, yRight + 14)
      .lineWidth(0.8)
      .strokeColor(PRIMARY)
      .stroke();

    yRight += 20;

    doc
      .fontSize(9.5)
      .font("Helvetica")
      .fillColor(TEXT_MAIN);

    safe(career.bestInstitutesIndia).slice(0, 5).forEach((iName) => {
      doc.text(`• ${iName}`, xRight, yRight, { width: colWidth });
      yRight += 13;
    });

    if (safe(career.bestInstitutesAbroad).length) {
      yRight += 6;
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor(PRIMARY_DARK)
        .text("Top institutes (Abroad)", xRight, yRight, {
          width: colWidth,
        });
      yRight += 18;
      doc
        .fontSize(9.5)
        .font("Helvetica")
        .fillColor(TEXT_MAIN);
      safe(career.bestInstitutesAbroad).slice(0, 4).forEach((iName) => {
        doc.text(`• ${iName}`, xRight, yRight, { width: colWidth });
        yRight += 13;
      });
    }


    /* ─── centered career image ─── */

const source = (career.code || career.name || "").toUpperCase();

const imageKey = Object.keys(CAREER_IMAGE_MAP).find(key =>
  source.includes(key.split("_")[0])
);


const imageFile = imageKey ? CAREER_IMAGE_MAP[imageKey] : null;

if (imageFile) {
  const imagePath = path.join(ASSETS_DIR, imageFile);

  if (fs.existsSync(imagePath)) {
    const imageWidth = 300;   // 👈 bigger
    const imageHeight = 190;  // 👈 proportionate

    const imageX = cardX2 + (cardW2 - imageWidth) / 2; // 👈 CENTERED
    const imageY = Math.min(
      yRight + 210,
      bandY - imageHeight - 24
    );

    doc
      .roundedRect(imageX - 6, imageY - 6, imageWidth + 12, imageHeight + 12, 10)
      .fillColor("#F9FAFB")
      .fill();

    doc.image(imagePath, imageX, imageY, {
      width: imageWidth,
      height: imageHeight,
      align: "center",
      valign: "center",
    });
  }
}


    // fees & salary strip
    // let bandY = cardY2 + cardH2 - 70;
    doc
      .roundedRect(cardX2 + 18, bandY, cardW2 - 36, 52, 8)
      .fillColor("#F9FAFB")
      .fill();

    const bandInnerX = cardX2 + 26;
    const bandInnerW = cardW2 - 52;
    const bandColW = bandInnerW / 3;

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor(PRIMARY_DARK)
      .text("Fees (India)", bandInnerX, bandY + 10, { width: bandColW });
    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(TEXT_MAIN)
      .text(
        career.feesIndia || "Varies by institute",
        bandInnerX,
        bandY + 25,
        {
          width: bandColW,
        }
      );

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor(PRIMARY_DARK)
      .text("Fees (Abroad)", bandInnerX + bandColW, bandY + 10, {
        width: bandColW,
      });
    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(TEXT_MAIN)
      .text(
        career.feesAbroad || "Depends on country",
        bandInnerX + bandColW,
        bandY + 25,
        { width: bandColW }
      );

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor(PRIMARY_DARK)
      .text("Average salary", bandInnerX + bandColW * 2, bandY + 10, {
        width: bandColW,
      });
    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(TEXT_MAIN)
      .text(
        [
          career.salaryIndia ? `IN: ${career.salaryIndia}` : null,
          career.salaryAbroad ? `AB: ${career.salaryAbroad}` : null,
        ]
          .filter(Boolean)
          .join(" | ") || "Varies by role & experience",
        bandInnerX + bandColW * 2,
        bandY + 25,
        { width: bandColW }
      );
  });

  /* ═════════ FINAL NOTE PAGE ═════════ */

  addNewPage(doc, margins, width, height);

  const contentAreaStart = 130;
  const contentAreaEnd = height - 60;
  const contentAreaHeight = contentAreaEnd - contentAreaStart;
  const verticalCenter = contentAreaStart + contentAreaHeight / 2;

  const finalCardW = width - margins.left - margins.right;
  const finalCardH = 260;
  const finalCardX = margins.left;
  const finalCardY = verticalCenter - finalCardH / 2;

  doc
    .roundedRect(finalCardX, finalCardY, finalCardW, finalCardH, 10)
    .fillColor(CARD_BG)
    .fill()
    .roundedRect(finalCardX, finalCardY, finalCardW, finalCardH, 10)
    .lineWidth(0.6)
    .strokeColor(CARD_BORDER)
    .stroke();

  let y = finalCardY + 30;
  const x = finalCardX + 30;
  const wInner = finalCardW - 60;

  doc
    .moveTo(x, y)
    .lineTo(x + 90, y)
    .lineWidth(2)
    .strokeColor(PRIMARY)
    .stroke();
  y += 18;

  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .fillColor(PRIMARY_DARK)
    .text("Final Note", x, y, { width: wInner, align: "left" });

  y += 32;

  doc
    .fontSize(11)
    .font("Helvetica")
    .fillColor(TEXT_MAIN)
    .text(
      "This handbook is a decision-support tool — not a verdict. Careers evolve with effort, exposure and adaptability.",
      x,
      y,
      { width: wInner, align: "left" }
    );

  y += 50;

  doc
    .fontSize(10.5)
    .font("Helvetica")
    .fillColor(TEXT_MUTED)
    .text(
      "Use these insights as a compass to explore streams and careers that resonate with your strengths and interests. Discuss this report with your parents, teachers and counsellors before taking final decisions.",
      x,
      y,
      { width: wInner, align: "left" }
    );

  y += 72;

  doc
    .fontSize(11.5)
    .font("Helvetica-Bold")
    .fillColor(PRIMARY)
    .text("Keep exploring. Keep growing. Keep dreaming!", x, y, {
      width: wInner,
      align: "left",
    });

  doc.end();
  return filePath;
};
