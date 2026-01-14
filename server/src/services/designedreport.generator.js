import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/* ───────────────── PATHS ───────────────── */
const LOGO_PATH = path.join(process.cwd(), "src/assets/basiclogo1.png");
const FONT_PATH = path.join(process.cwd(), "src/assets/fonts/NotoSans-Regular.ttf");

/* ───────────────── UTIL ───────────────── */
const safe = (v) => (Array.isArray(v) ? v : []);

/* ───────────────── PAGE DECORATOR ───────────────── */
// This now returns the doc to allow chaining if needed
const drawPageChrome = (doc, pageNo) => {
  const { width, height, margins } = doc.page;

  /* Light background tint */
  doc
    .save()
    .rect(0, 0, width, height)
    .fillOpacity(0.03)
    .fill("#2b6cb0")
    .restore();

  /* Logo — small, top-left */
  if (fs.existsSync(LOGO_PATH)) {
    doc.image(LOGO_PATH, margins.left, 20, { width: 55 });
  }

  /* Watermark */
  doc
    .save()
    .rotate(-35, { origin: [width / 2, height / 2] })
    .fontSize(60)
    .fillColor("#999")
    .fillOpacity(0.08)
    .text("CollegeReviewz", width / 6, height / 2, { align: "center" })
    .restore();

  /* Footer */
  doc
    .fontSize(9)
    .fillOpacity(0.6)
    .fillColor("#444")
    .text(`Page ${pageNo}`, 0, height - 40, { align: "center" })
    .fillOpacity(1);

  // Reset text cursor to top margin after drawing chrome
  doc.y = margins.top + 20; 
  return doc;
};

/* ───────────────── MAIN GENERATOR ───────────────── */

export const generateAssessmentReport = ({ studentProfile, signals, careers }) => {
  // Initialize with autoFirstPage: false so we control the first page layout
  const doc = new PDFDocument({ size: "A4", margin: 50, autoFirstPage: false });
  let pageNo = 1;

  const filePath = path.join("reports", `career-report-${studentProfile.studentId}.pdf`);
  fs.mkdirSync("reports", { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  /* Register Font */
  if (fs.existsSync(FONT_PATH)) {
    doc.registerFont("Noto", FONT_PATH);
    doc.font("Noto");
  }

  /* ───────── PAGE 1: HEADER ───────── */
  doc.addPage();
  drawPageChrome(doc, pageNo);

  doc
    .fontSize(22)
    .fillColor("#111")
    .text("Career Assessment Handbook", { align: "center" });

  doc.moveDown(2);
  doc.fontSize(12).fillColor("#000");
  doc.text(`Student ID: ${studentProfile.studentId}`);
  doc.text(`Class: ${studentProfile.currentClass}`);
  doc.text(`Stream: ${studentProfile.stream}`);
  doc.text(`Family Budget: ${studentProfile.familyAnnualBudget}`);

  /* ───────── PAGE 2: APTITUDE ───────── */
  doc.addPage();
  pageNo++;
  drawPageChrome(doc, pageNo);

  doc.fontSize(15).text("Aptitude Breakdown", { underline: true });
  doc.moveDown();

  Object.entries(signals).forEach(([k, v]) => {
    doc.fontSize(12).text(`${k.toUpperCase()}: ${v}/100`);
  });

  /* ───────── CAREER PAGES ───────── */
  careers.forEach((career, index) => {
    doc.addPage();
    pageNo++;
    drawPageChrome(doc, pageNo);

    doc.fontSize(16).fillColor("#1a365d").text(`${index + 1}. ${career.name}`, { underline: true });
    doc.moveDown(0.5);
    
    doc.fontSize(11).fillColor("#000");
    doc.text(`Tier: ${career.tier}`);
    doc.text(`Compatibility Score: ${career.compatibilityScore}%`);

    const sections = [
      { label: "Career Options in India:", data: career.roles },
      { label: "Career Options Abroad:", data: career.rolesAbroad },
      { label: "Top Institutes (India):", data: career.bestInstitutesIndia },
      { label: "Top Institutes (Abroad):", data: career.bestInstitutesAbroad },
    ];

    sections.forEach(section => {
      if (safe(section.data).length > 0) {
        doc.moveDown(0.8).fontSize(12).text(section.label, { stroke: false });
        doc.fontSize(10);
        safe(section.data).forEach(item => doc.text(`  • ${item}`));
      }
    });

    doc.moveDown().fontSize(11);
    doc.text(`Estimated Fees (India): ${career.feesIndia ? `₹${career.feesIndia}` : "Varies"}`);
    if (career.salaryIndia) {
      doc.text(`Average Salary (India): ${career.salaryIndia}`);
    }
  });

  /* ───────── FINAL PAGE ───────── */
  doc.addPage();
  pageNo++;
  drawPageChrome(doc, pageNo);

  doc.fontSize(15).text("Final Note", { underline: true });
  doc.moveDown();
  doc.fontSize(11).text(
    "This handbook is a decision-support tool — not a verdict.\n" +
    "Careers evolve with effort, exposure, and adaptability.\n\n" +
    "Use this report as a compass — not a cage."
  );

  doc.end();
  return filePath;
};