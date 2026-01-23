// services/report.generator.js
// NOTE: This is Node.js backend code - cannot run in browser/React
// Use this file as a reference to run on your own backend server

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


//DON'T CHANGE THESE 2 LINES BELOW............

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const ASSETS_DIR = path.resolve(__dirname, "../assets");

const MOBILE_ICON = path.join(__dirname, "../assets/icons/mobile.png");

/* ───────────────── UTIL ───────────────── */
const safe = (v) => (Array.isArray(v) ? v : []);

/* ───────────────── FONT & ASSETS ───────────────── */
const FONT_PATH = path.join(process.cwd(), "src/assets/fonts/NotoSans-Regular.ttf");
const FRAMEWORK_IMG_PATH = path.join(process.cwd(), "src/assets/stream-framework.png");
const PROFESSIONS_IMG_PATH = path.join(process.cwd(), "src/assets/professions.png");
const STUDENT_PHOTO_PATH = path.join(process.cwd(), "src/assets/student-profile.png");
const HEADER_BG_IMG_PATH = path.join(process.cwd(), "src/assets/header-background.jpg");
const CAREER_COUNSELLING_IMG_PATH = path.join(process.cwd(), "src/assets/career-counselling.jpg");

/* ───────────────── COVER PAGE ASSETS ───────────────── */
// REMOVED: cover-illustration.png - no longer used
const COVER_LOGO_PATH = path.join(process.cwd(), "src/assets/logo (2).png");

/* ───────────────── CAREER IMAGES ───────────────── */
const CAREER_IMAGE_MAP = {
  ENGINEERING_TECH: "engg.jpg",
  MEDICAL_HEALTH: "medical.jpg",
  SCIENCE_AND_RESEARCH: "science.jpg",
  ARMED_FORCE: "armed.jpg",
  FINANCE_COMMERCE: "finance.jpg",
  ENTREPRENEURSHIP_STARTUP: "startup.jpg",
  HOSPITALITY_HOTEL: "hospitality.png",
  EDUCATION_TEACHING: "education.jpg",
  LAW_LEGAL: "law.jpg",
  FOUNDATION_PATH: "foundational.jpg",
};

/* ───────────────── CAREER ICONS ───────────────── */
const CAREER_ICONS = {
  medical: path.join(process.cwd(), "src/assets/icons/medical.png"),
  engineering: path.join(process.cwd(), "src/assets/icons/engineering.png"),
  law: path.join(process.cwd(), "src/assets/icons/law.png"),
  business: path.join(process.cwd(), "src/assets/icons/business.png"),
  arts: path.join(process.cwd(), "src/assets/icons/arts.png"),
  science: path.join(process.cwd(), "src/assets/icons/science.png"),
  technology: path.join(process.cwd(), "src/assets/icons/technology.png"),
  finance: path.join(process.cwd(), "src/assets/icons/finance.png"),
  education: path.join(process.cwd(), "src/assets/icons/education.png"),
  design: path.join(process.cwd(), "src/assets/icons/design.png"),
  hospitality: path.join(process.cwd(), "src/assets/icons/hospitality.png"),
  armed: path.join(process.cwd(), "src/assets/icons/armed.png"),
  default: path.join(process.cwd(), "src/assets/icons/career.png"),
};

/* ───────────────── SECTION ICONS ───────────────── */
const SECTION_ICONS = {
  careerIndia: path.join(process.cwd(), "src/assets/icons/india-flag.png"),
  careerAbroad: path.join(process.cwd(), "src/assets/icons/globe.png"),
  fees: path.join(process.cwd(), "src/assets/icons/fees.png"),
  salary: path.join(process.cwd(), "src/assets/icons/salary.png"),
  institutes: path.join(process.cwd(), "src/assets/icons/institutes.png"),
  roadmap: path.join(process.cwd(), "src/assets/icons/roadmap.png"),
};

/* ───────────────── CAREER CATEGORY CONFIG ───────────────── */
const CAREER_CATEGORIES = {
  medical: {
    icon: "M",
    label: "MEDICAL",
    gradient: ["#EF4444", "#DC2626", "#B91C1C"],
    bgColor: "#FEF2F2"
  },
  engineering: {
    icon: "E",
    label: "ENGINEERING",
    gradient: ["#3B82F6", "#2563EB", "#1D4ED8"],
    bgColor: "#EFF6FF"
  },
  law: {
    icon: "L",
    label: "LAW",
    gradient: ["#8B5CF6", "#7C3AED", "#6D28D9"],
    bgColor: "#F5F3FF"
  },
  business: {
    icon: "B",
    label: "BUSINESS",
    gradient: ["#F59E0B", "#D97706", "#B45309"],
    bgColor: "#FFFBEB"
  },
  arts: {
    icon: "A",
    label: "ARTS",
    gradient: ["#EC4899", "#DB2777", "#BE185D"],
    bgColor: "#FDF2F8"
  },
  science: {
    icon: "S",
    label: "SCIENCE",
    gradient: ["#06B6D4", "#0891B2", "#0E7490"],
    bgColor: "#ECFEFF"
  },
  technology: {
    icon: "T",
    label: "TECHNOLOGY",
    gradient: ["#10B981", "#059669", "#047857"],
    bgColor: "#ECFDF5"
  },
  finance: {
    icon: "F",
    label: "FINANCE",
    gradient: ["#84CC16", "#65A30D", "#4D7C0F"],
    bgColor: "#F7FEE7"
  },
  education: {
    icon: "E",
    label: "EDUCATION",
    gradient: ["#14B8A6", "#0D9488", "#0F766E"],
    bgColor: "#F0FDFA"
  },
  design: {
    icon: "D",
    label: "DESIGN",
    gradient: ["#F472B6", "#EC4899", "#DB2777"],
    bgColor: "#FDF2F8"
  },
  hospitality: {
    icon: "H",
    label: "HOSPITALITY",
    gradient: ["#F97316", "#EA580C", "#C2410C"],
    bgColor: "#FFF7ED"
  },
  armed: {
    icon: "A",
    label: "ARMED FORCES",
    gradient: ["#059669", "#047857", "#065F46"],
    bgColor: "#ECFDF5"
  },
  default: {
    icon: "C",
    label: "CAREER",
    gradient: ["#6366F1", "#4F46E5", "#4338CA"],
    bgColor: "#EEF2FF"
  }
};

/* ───────────────── CONTACT INFO ───────────────── */
const CONTACT_INFO = {
  address: "217, 2nd Floor, Diamond Arcade, Shyam Nagar Road, Kolkata - 700055",
  email: "admin@collegereviewz.com",
  mobile: "+91 97179 87058",
};

/* ───────────────── COLOURS - Updated with Dark Blue Theme ───────────────── */

// Soft Sky Blue Header & Footer Theme (from image)
const HEADER_GRADIENT_START = "#7DB5DB";   // Top soft sky blue
const HEADER_GRADIENT_MID   = "#9CCCEC";   // Mid light blue
const HEADER_GRADIENT_END   = "#C6E6FB";   // Bottom very light blue

// Primary Colors - Pastel Blue Theme
const PRIMARY = "#7DB5DB";                 // Main soft blue
const PRIMARY_DARK = "#4F87B0";            // Leaf/dark accent blue
const PRIMARY_LIGHT = "#BFE4FA";           // Light pastel blue

// Background & Card Colors
const PAGE_BG = "#EAF6FD";                 // Image center background
const CARD_BG = "#F3FAFF";                 // Card white-blue
const CARD_BG_ULTRA_LIGHT = "#F7FCFF";     // Ultra soft background
const CARD_BORDER = "#D6EAF7";              // Subtle blue border

// Text Colors
const TEXT_MAIN = "#3E6E91";                // Dark muted blue text
const TEXT_MUTED = "#6F9FBE";               // Soft muted blue text

// Cover Page Colors
const COVER_DARK_BLUE = "#1E3A5F";         // Dark navy blue for cover
const COVER_MEDIUM_BLUE = "#2B4A6F";       // Medium blue accent
const COVER_LIGHT_BLUE = "#E8F4FC";        // Light blue background

/* ───────────────── LAYOUT CONSTANTS ───────────────── */
const HEADER_HEIGHT = 120;
const FOOTER_HEIGHT = 35;
const CONTENT_START_Y = HEADER_HEIGHT + 15;

/* ───────────────── TIER CONFIGURATION ───────────────── */
const TIER_CONFIG = {
  GREEN: {
    color: "#10B981",
    gradient: ["#10B981", "#059669", "#047857"],
    label: "BEST FIT",
    description: "Best-fit careers aligned with your strengths"
  },
  YELLOW: {
    color: "#F59E0B",
    gradient: ["#F59E0B", "#D97706", "#B45309"],
    label: "IDEAL",
    description: "Suitable options with good potential"
  },
  ORANGE: {
    color: "#F97316",
    gradient: ["#F97316", "#EA580C", "#C2410C"],
    label: "MODERATE",
    description: "Moderate fit requiring additional effort"
  },
  RED: {
    color: "#EF4444",
    gradient: ["#EF4444", "#DC2626", "#B91C1C"],
    label: "RISKY",
    description: "Higher risk paths requiring careful consideration"
  },
};

/* ───────────────── APTITUDE LEGEND LABELS ───────────────── */
const APTITUDE_LEGEND = {
  red: { label: "Needs Work", color: "#EF4444", range: "0-39" },
  yellow: { label: "Developing", color: "#F59E0B", range: "40-69" },
  green: { label: "Good", color: "#16A34A", range: "70-100" }
};

/* ───────────────── CAREER CATEGORY DETECTION ───────────────── */
const getCareerCategory = (careerName) => {
  const name = careerName.toLowerCase();
  if (name.includes("medical") || name.includes("doctor") || name.includes("health") || name.includes("nurse") || name.includes("pharmacy") || name.includes("mbbs")) return "medical";
  if (name.includes("engineer") || name.includes("mechanical") || name.includes("civil") || name.includes("electrical") || name.includes("electronics")) return "engineering";
  if (name.includes("law") || name.includes("legal") || name.includes("advocate") || name.includes("attorney") || name.includes("lawyer")) return "law";
  if (name.includes("business") || name.includes("management") || name.includes("mba") || name.includes("entrepreneur") || name.includes("commerce")) return "business";
  if (name.includes("art") || name.includes("music") || name.includes("theater") || name.includes("dance") || name.includes("creative")) return "arts";
  if (name.includes("science") || name.includes("research") || name.includes("biology") || name.includes("chemistry") || name.includes("physics")) return "science";
  if (name.includes("tech") || name.includes("software") || name.includes("computer") || name.includes("it") || name.includes("data") || name.includes("coding")) return "technology";
  if (name.includes("finance") || name.includes("accounting") || name.includes("banking") || name.includes("investment") || name.includes("ca") || name.includes("chartered")) return "finance";
  if (name.includes("teach") || name.includes("education") || name.includes("professor") || name.includes("instructor") || name.includes("academic")) return "education";
  if (name.includes("design") || name.includes("graphic") || name.includes("ui") || name.includes("ux") || name.includes("interior") || name.includes("fashion")) return "design";
  if (name.includes("hotel") || name.includes("hospitality") || name.includes("tourism") || name.includes("travel") || name.includes("resort") || name.includes("culinary") || name.includes("chef")) return "hospitality";
  if (name.includes("armed") || name.includes("army") || name.includes("navy") || name.includes("airforce") || name.includes("military") || name.includes("defence") || name.includes("defense")) return "armed";
  return "default";
};

/* ───────────────── PAGE DECOR - Ultra Light Background ───────────────── */
const drawPageBackground = (doc, width, height) => {
  doc.save();
  
  // Very light gradient background
  doc.rect(0, 0, width, height).fillColor(PAGE_BG).fill();
  
  // Subtle top gradient accent
  for (let i = 0; i < 4; i++) {
    doc.rect(0, i * 1.5, width, 1.5)
       .fillOpacity(0.6 - i * 0.12)
       .fillColor(HEADER_GRADIENT_START)
       .fill();
  }
  
  doc.fillOpacity(1);
  doc.restore();
};

/* ═══════════════════════════════════════════════════════════════════════════
   COVER PAGE - UPDATED: REMOVED ILLUSTRATION, SMALLER LOGO
   ═══════════════════════════════════════════════════════════════════════════ */
const drawCoverPage = (doc, width, height, studentName = "Student") => {
  doc.save();
  
  // ═══════════════════════════════════════════════════════════════════════════
  // WHITE BACKGROUND
  // ═══════════════════════════════════════════════════════════════════════════
  doc.rect(0, 0, width, height).fillColor("#FFFFFF").fill();
  
  // ═══════════════════════════════════════════════════════════════════════════
  // BLUE DIAGONAL RIBBON (RIGHT SIDE)
  // ═══════════════════════════════════════════════════════════════════════════
  doc.save();
  
  // Main diagonal blue ribbon on the right
  const ribbonWidth = 180;
  doc.moveTo(width - ribbonWidth + 60, 0)
     .lineTo(width, 0)
     .lineTo(width, height)
     .lineTo(width - ribbonWidth - 40, height)
     .closePath()
     .fillColor(COVER_DARK_BLUE)
     .fill();
  
  // Lighter blue accent stripe
  doc.moveTo(width - ribbonWidth + 30, 0)
     .lineTo(width - ribbonWidth + 60, 0)
     .lineTo(width - ribbonWidth - 40, height)
     .lineTo(width - ribbonWidth - 70, height)
     .closePath()
     .fillColor(COVER_MEDIUM_BLUE)
     .fill();
  
  doc.restore();
  
  // ═══════════════════════════════════════════════════════════════════════════
// HEADER - LOGO & WEBSITE (LOGO LARGER + REDUCED GAP)
// ═══════════════════════════════════════════════════════════════════════════
const headerY = 40;

// Logo on the left - INCREASED SIZE
if (fs.existsSync(COVER_LOGO_PATH)) {
  doc.image(COVER_LOGO_PATH, 40, headerY, {
    height: 75,   // Increased from 35 → 45
    align: "left"
  });
} else {
  // Fallback: Draw text logo
  doc.fontSize(50).font("Helvetica-Bold");  // Increased from 18
  doc.fillColor(COVER_DARK_BLUE)
     .text("CollegeReview", 40, headerY + 10, { continued: true });
  doc.fillColor("#F59E0B").text("Z", { continued: false });
}

// Website URL - moved closer to logo
doc.fontSize(10).font("Helvetica").fillColor(COVER_DARK_BLUE);
doc.text("www.collegereviewz.com", 40, headerY + 52, {  // Reduced gap
  width: width - 220,
  align: "left"
});

  
  // ═══════════════════════════════════════════════════════════════════════════
  // REMOVED: CENTER ILLUSTRATION - No longer using cover-illustration.png
  // Instead, we'll add more vertical space and adjust layout
  // ═══════════════════════════════════════════════════════════════════════════
  
// ═══════════════════════════════════════════════════════════════════════════
// MAIN TITLE - "2026 CAREER ASSESSMENT REPORT" (MOVED SLIGHTLY DOWN)
// ═══════════════════════════════════════════════════════════════════════════
const titleY = 390;  // moved down from 180 → 390

doc.fontSize(32).font("Helvetica-Bold").fillColor(COVER_DARK_BLUE);
doc.text("2026", 40, titleY, {
  width: width - 220,
  align: "left"
});

doc.fontSize(28).font("Helvetica-Bold").fillColor(COVER_DARK_BLUE);
doc.text("CAREER ASSESSMENT", 40, titleY + 40, {
  width: width - 220,
  align: "left"
});

doc.fontSize(28).font("Helvetica-Bold").fillColor(COVER_DARK_BLUE);
doc.text("REPORT", 40, titleY + 75, {
  width: width - 220,
  align: "left"
});

// Decorative underline
doc.rect(40, titleY + 115, 120, 4)
   .fillColor(COVER_DARK_BLUE)
   .fill();

// ═══════════════════════════════════════════════════════════════════════════
// "PREPARED BY" SECTION
// ═══════════════════════════════════════════════════════════════════════════
const preparedY = titleY + 145;

doc.fontSize(10).font("Helvetica-Bold").fillColor("#666666");
doc.text("Prepared By:", 40, preparedY);

doc.fontSize(14).font("Helvetica-Bold").fillColor(COVER_DARK_BLUE);
doc.text("CollegeReviewZ", 40, preparedY + 18);

// ═══════════════════════════════════════════════════════════════════════════
// "PRESENTED TO" SECTION (STUDENT NAME)
// ═══════════════════════════════════════════════════════════════════════════
const presentedY = preparedY + 55;

doc.fontSize(10).font("Helvetica-Bold").fillColor("#666666");
doc.text("Presented To:", 40, presentedY);

doc.fontSize(14).font("Helvetica-Bold").fillColor(COVER_DARK_BLUE);
doc.text(studentName, 40, presentedY + 18);
  
// ═══════════════════════════════════════════════════════════════════════════
// FOOTER - CONTACT INFORMATION (FIXED)
// ═══════════════════════════════════════════════════════════════════════════

// Move footer upward so everything stays on the same page
const footerY = height - 90;

doc.fontSize(9)
   .font("Helvetica")
   .fillColor("#666666");

// Phone
doc.text(`Phone: ${CONTACT_INFO.mobile}`, 40, footerY);

// Email
doc.text(`Email: ${CONTACT_INFO.email}`, 40, footerY + 14);

  
  // ═══════════════════════════════════════════════════════════════════════════
  // VERTICAL TEXT ON RIBBON - "CAREER ASSESSMENT"
  // ═══════════════════════════════════════════════════════════════════════════
  doc.save();
  
  // Rotate and draw text on the blue ribbon
  const ribbonTextX = width - 50;
  const ribbonTextY = height / 2 + 120;
  
  doc.translate(ribbonTextX, ribbonTextY);
  doc.rotate(-90);
  
  doc.fontSize(14).font("Helvetica-Bold").fillColor("#FFFFFF");
  doc.text("CAREER ASSESSMENT REPORT", 0, 0, {
    width: 300,
    align: "center"
  });
  
  doc.restore();
  
  doc.restore();
};

/* ═══════════════════════════════════════════════════════════════════════════
   UPDATED HEADER - USES BACKGROUND IMAGE (NO GRADIENT), SMALLER LOGO
   ═══════════════════════════════════════════════════════════════════════════ */
const drawHeader = (doc, margins, width, height, studentPhotoPath = null) => {
  doc.save();
  
  // Use header background image if exists, otherwise solid dark blue
  if (fs.existsSync(HEADER_BG_IMG_PATH)) {
    doc.image(HEADER_BG_IMG_PATH, 0, 0, {
      width: width,
      height: HEADER_HEIGHT,
      cover: [width, HEADER_HEIGHT]
    });
  } else {
    // Fallback: solid dark blue background (no gradient)
    doc.rect(0, 0, width, HEADER_HEIGHT).fillColor(PRIMARY_DARK).fill();
  }
  
  doc.fillOpacity(1);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STUDENT PHOTO IN HEADER (replaces logo)
  // ═══════════════════════════════════════════════════════════════════════════
  const photoSize = 50;
  const photoX = (width - photoSize) / 2;
  const photoY = 8;
  
  // Photo border frame
  doc.circle(photoX + photoSize/2, photoY + photoSize/2, photoSize/2 + 2)
     .fillColor(PRIMARY_DARK)
     .fill();
  
  doc.circle(photoX + photoSize/2, photoY + photoSize/2, photoSize/2)
     .fillColor("#FFFFFF")
     .fill();
  
  // Determine which photo to use
  const photoPath = studentPhotoPath || STUDENT_PHOTO_PATH;
  
  if (fs.existsSync(photoPath)) {
    // Clip to circle and add photo
    doc.save();
    doc.circle(photoX + photoSize/2, photoY + photoSize/2, photoSize/2 - 1).clip();
    doc.image(photoPath, photoX, photoY, { 
      width: photoSize, 
      height: photoSize,
      fit: [photoSize, photoSize],
      align: "center",
      valign: "center"
    });
    doc.restore();
  } else {
    // Logo instead of CR initials - REDUCED SIZE
    const LOGO_PATH = path.join(process.cwd(), "src/assets/logo (2).png");

    if (fs.existsSync(LOGO_PATH)) {
  doc.image(LOGO_PATH, photoX + 1, photoY + 1, {
    fit: [photoSize - 2, photoSize - 2], // Much larger image inside circle
    align: "center",
    valign: "center"
  });
}

  }
  
  doc.fillOpacity(1);
  
  // Brand name below photo
  const brandY = photoY + photoSize + 6;
  doc.fontSize(16).font("Helvetica-Bold");
  
  const brandText1 = "CollegeReview";
  const brandText2 = "Z";
  const text1Width = doc.widthOfString(brandText1);
  const text2Width = doc.widthOfString(brandText2);
  const totalBrandWidth = text1Width + text2Width;
  const brandStartX = (width - totalBrandWidth) / 2;
  
  doc.fillColor("#FFFFFF").text(brandText1, brandStartX, brandY, { 
    continued: false, 
    lineBreak: false,
    width: text1Width
  });
  doc.fillColor("#FEF08A").text(brandText2, brandStartX + text1Width, brandY, { 
    lineBreak: false,
    width: text2Width
  });
  
  const titleY = brandY + 20;
  doc.fontSize(11).font("Helvetica-Bold").fillColor("#FFFFFF");
  doc.text("Career Assessment Handbook", 0, titleY, {
    width: width,
    align: "center",
    lineBreak: false
  });
  
  const contactY = titleY + 16;
  doc.fontSize(6).font("Helvetica").fillColor("#E0F2FE");
  const contactLine = `${CONTACT_INFO.address}  |  ${CONTACT_INFO.email}  |  ${CONTACT_INFO.mobile}`;
  doc.text(contactLine, margins.left, contactY, {
    width: width - margins.left * 2,
    align: "center",
    lineBreak: false,
    height: 12
  });
  
  doc.restore();
};

/* ───────────────── PROFESSIONAL FOOTER - SOLID DARK BLUE (NO GRADIENT) ───────────────── */
const drawFooter = (doc, margins, width, height) => {
  doc.save();
  
  const footerY = height - FOOTER_HEIGHT;
  
  // Solid dark blue footer (no gradient, no shine effects)
  doc.rect(0, footerY, width, FOOTER_HEIGHT).fillColor(PRIMARY_DARK).fill();
  
  doc.fillOpacity(1);
  
  const rowY = footerY + 12;
  doc.fontSize(6).font("Helvetica").fillColor("#E0F2FE");
  const contactLine = `${CONTACT_INFO.address}  |  ${CONTACT_INFO.email}  |  ${CONTACT_INFO.mobile}`;
  doc.text(contactLine, margins.left, rowY, {
    width: width - margins.left * 2,
    align: "center",
    lineBreak: false,
    height: 12
  });
  
  doc.restore();
};

const drawWatermark = (doc, width, height) => {
  doc.save();
  doc.rotate(-35, { origin: [width / 2, height / 2] });
  doc.fontSize(50).fillColor("#BAE6FD").fillOpacity(0.04);
  doc.text("CollegeReviewz", width / 6, height / 2, { 
    align: "center",
    lineBreak: false
  });
  doc.restore();
  doc.fillOpacity(1);
};

/* ───────────────── CONTENT AREA HELPERS ───────────────── */
const getContentBounds = (doc) => {
  const { width, height, margins } = doc.page;
  return {
    top: CONTENT_START_Y,
    bottom: height - FOOTER_HEIGHT - 15,
    left: margins.left,
    right: width - margins.right,
    width: width - margins.left - margins.right
  };
};

const addNewPage = (doc, margins, width, height, studentPhotoPath = null) => {
  doc.addPage();
  drawPageBackground(doc, width, height);
  drawHeader(doc, margins, width, height, studentPhotoPath);
  drawFooter(doc, margins, width, height);
  drawWatermark(doc, width, height);
  doc.y = CONTENT_START_Y;
  doc.x = margins.left;
};

/* ───────────────── ULTRA LIGHT GLOSSY CARD ───────────────── */
const drawGlossyCard = (doc, x, y, w, h, radius = 8, accentColor = PRIMARY) => {
  doc.save();
  
  // Very subtle outer shadow
  doc.roundedRect(x + 2, y + 2, w, h, radius)
     .fillOpacity(0.03)
     .fillColor("#000000")
     .fill();
  
  // Ultra light background
  doc.roundedRect(x, y, w, h, radius)
     .fillColor(CARD_BG_ULTRA_LIGHT)
     .fill();
  
  // Inner white layer
  doc.roundedRect(x + 1, y + 1, w - 2, h - 2, radius - 1)
     .fillColor(CARD_BG)
     .fill();
  
  // Glossy shine layers
  doc.roundedRect(x, y, w, h * 0.2, radius)
     .fillOpacity(0.08)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.roundedRect(x, y, w, h * 0.08, radius)
     .fillOpacity(0.06)
     .fillColor("#FFFFFF")
     .fill();
  
  // Very subtle border
  doc.roundedRect(x, y, w, h, radius)
     .lineWidth(0.5)
     .strokeOpacity(0.1)
     .strokeColor(accentColor)
     .stroke();
  
  // Top accent line
  doc.roundedRect(x, y, w, 2, radius)
     .fillOpacity(0.6)
     .fillColor(accentColor)
     .fill();
  
  doc.fillOpacity(1);
  doc.strokeOpacity(1);
  doc.restore();
};

/* ───────────────── GLOSSY SECTION CARD ───────────────── */
const drawGlossySectionCard = (doc, x, y, w, h, title, gradientColors, radius = 8) => {
  doc.save();
  
  // Card background
  doc.roundedRect(x, y, w, h, radius)
     .fillColor(CARD_BG)
     .fill();
  
  const headerH = 28;
  
  // Header gradient
  doc.roundedRect(x, y, w, headerH, radius)
     .fillColor(gradientColors[0])
     .fill();
  
  // Glossy shine on header
  doc.roundedRect(x, y, w, headerH * 0.4, radius)
     .fillOpacity(0.25)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.roundedRect(x, y, w, headerH * 0.2, radius)
     .fillOpacity(0.15)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  // Title text
  doc.fontSize(9).font("Helvetica-Bold").fillColor("#FFFFFF");
  doc.text(title, x + 10, y + 8, {
    width: w - 20,
    align: "left",
    lineBreak: false
  });
  
  // Card border
  doc.roundedRect(x, y, w, h, radius)
     .lineWidth(0.5)
     .strokeOpacity(0.2)
     .strokeColor(gradientColors[0])
     .stroke();
  
  doc.strokeOpacity(1);
  doc.restore();
  
  return headerH;
};

/* ───────────────── ADVANCED GRADIENT BORDER ───────────────── */
const drawAdvancedGradientBorder = (doc, x, y, boxWidth, boxHeight, gradientColors, borderWidth = 3, radius = 10) => {
  doc.save();
  
  const layers = gradientColors.length;
  const layerWidth = borderWidth / layers;
  
  for (let i = 0; i < layers; i++) {
    const offset = i * layerWidth;
    const opacity = 0.8 - (i * 0.15);
    
    doc.roundedRect(x + offset, y + offset, boxWidth - offset * 2, boxHeight - offset * 2, radius - offset)
       .strokeColor(gradientColors[i])
       .lineWidth(layerWidth + 0.3)
       .strokeOpacity(opacity)
       .stroke();
  }
  
  // Very subtle inner glow
  doc.roundedRect(x + borderWidth, y + borderWidth, boxWidth - borderWidth * 2, boxHeight - borderWidth * 2, radius - borderWidth)
     .fillOpacity(0.01)
     .fillColor(gradientColors[0])
     .fill();
  
  doc.restore();
};

/* ───────────────── DRAW PNG ICON ───────────────── */
const drawPngIcon = (doc, iconPath, fallbackLetter, x, y, size, bgColor, gradientColor) => {
  doc.save();
  
  // Outer glow
  doc.circle(x + size/2, y + size/2, size/2 + 2)
     .fillOpacity(0.1)
     .fillColor(gradientColor || bgColor)
     .fill();
  
  // White background
  doc.circle(x + size/2, y + size/2, size/2)
     .fillOpacity(1)
     .fillColor("#FFFFFF")
     .fill();
  
  // Border
  doc.circle(x + size/2, y + size/2, size/2)
     .strokeColor(gradientColor || bgColor)
     .lineWidth(1.5)
     .stroke();
  
  if (fs.existsSync(iconPath)) {
    const iconSize = size * 0.88;
    const iconOffset = (size - iconSize) / 2;
    
    doc.save();
    doc.circle(x + size/2, y + size/2, size/2 - 2).clip();
    
    doc.image(iconPath, x + iconOffset, y + iconOffset, { 
      width: iconSize, 
      height: iconSize,
      fit: [iconSize, iconSize],
      align: "center",
      valign: "center"
    });
    
    doc.restore();
  } else {
    doc.fontSize(size * 0.35).font("Helvetica-Bold").fillColor(gradientColor || bgColor);
    doc.text(fallbackLetter, x, y + size * 0.32, {
      width: size,
      align: "center",
      lineBreak: false
    });
  }
  
  doc.restore();
};

/* ───────────────── DRAW SQUARE STUDENT PHOTO WITH 3D FRAME ───────────────── */
const drawStudentPhotoSquare = (doc, photoPath, x, y, size) => {
  doc.save();
  
  const hasPhoto = fs.existsSync(photoPath);
  const cornerRadius = 12;
  
  // Outer shadow (3D depth effect)
  doc.roundedRect(x + 4, y + 4, size, size, cornerRadius)
     .fillOpacity(0.08)
     .fillColor("#000000")
     .fill();
  
  doc.roundedRect(x + 3, y + 3, size, size, cornerRadius)
     .fillOpacity(0.05)
     .fillColor("#000000")
     .fill();
  
  // Gradient border frame - outer layer
  doc.roundedRect(x - 4, y - 4, size + 8, size + 8, cornerRadius + 4)
     .fillOpacity(1)
     .fillColor(PRIMARY_DARK)
     .fill();
  
  // Gradient border - middle layer
  doc.roundedRect(x - 3, y - 3, size + 6, size + 6, cornerRadius + 3)
     .fillOpacity(1)
     .fillColor(PRIMARY)
     .fill();
  
  // Gradient border - inner layer
  doc.roundedRect(x - 2, y - 2, size + 4, size + 4, cornerRadius + 2)
     .fillOpacity(1)
     .fillColor(PRIMARY_LIGHT)
     .fill();
  
  // White inner frame
  doc.roundedRect(x - 1, y - 1, size + 2, size + 2, cornerRadius + 1)
     .fillOpacity(1)
     .fillColor("#FFFFFF")
     .fill();
  
  // Photo or placeholder
  if (hasPhoto) {
    doc.save();
    doc.roundedRect(x, y, size, size, cornerRadius).clip();
    doc.image(photoPath, x, y, {
      width: size,
      height: size,
      fit: [size, size],
      align: "center",
      valign: "center"
    });
    doc.restore();
  } else {
    // Invisible/subtle placeholder when no photo
    doc.roundedRect(x, y, size, size, cornerRadius)
       .fillColor("#F8FAFC")
       .fill();
    
    // Very subtle user icon placeholder
    const iconCenterX = x + size / 2;
    const iconCenterY = y + size / 2;
    
    // Head circle
    doc.circle(iconCenterX, iconCenterY - size * 0.08, size * 0.15)
       .fillOpacity(0.08)
       .fillColor(PRIMARY)
       .fill();
    
    // Body arc
    doc.ellipse(iconCenterX, iconCenterY + size * 0.22, size * 0.25, size * 0.18)
       .fillOpacity(0.06)
       .fillColor(PRIMARY)
       .fill();
  }
  
  // Glossy shine overlay (top-left corner highlight)
  doc.save();
  doc.roundedRect(x, y, size, size, cornerRadius).clip();
  
  // Top shine
  doc.roundedRect(x, y, size, size * 0.35, cornerRadius)
     .fillOpacity(0.12)
     .fillColor("#FFFFFF")
     .fill();
  
  // Corner shine
  doc.ellipse(x + size * 0.25, y + size * 0.18, size * 0.35, size * 0.2)
     .fillOpacity(0.08)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.restore();
  
  // Inner border for depth
  doc.roundedRect(x, y, size, size, cornerRadius)
     .strokeColor("#FFFFFF")
     .strokeOpacity(0.5)
     .lineWidth(1)
     .stroke();
  
  doc.fillOpacity(1);
  doc.strokeOpacity(1);
  doc.restore();
};

/* ───────────────── DEPARTMENT HEADER WITH GLOSSY LOOK ───────────────── */
const drawDepartmentHeader = (doc, careerName, x, y, boxWidth, tierColor) => {
  doc.save();
  
  const category = getCareerCategory(careerName);
  const categoryConfig = CAREER_CATEGORIES[category];
  const headerHeight = 55;
  const gradient = categoryConfig.gradient;
  
  // Background
  doc.roundedRect(x, y, boxWidth, headerHeight, 10)
     .fillColor(categoryConfig.bgColor)
     .fill();
  
  // Glossy overlay
  doc.roundedRect(x, y, boxWidth, headerHeight * 0.3, 10)
     .fillOpacity(0.1)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  // Top accent
  doc.rect(x, y, boxWidth, 4).fillColor(gradient[0]).fill();
  doc.rect(x, y + 4, boxWidth, 1).fillOpacity(0.5).fillColor(gradient[1]).fill();
  doc.fillOpacity(1);
  
  // Left accent
  doc.rect(x, y + 5, 4, headerHeight - 5).fillColor(gradient[1]).fill();
  
  // Icon
  const iconPath = CAREER_ICONS[category] || CAREER_ICONS.default;
  const iconSize = 36;
  const iconX = x + 18;
  const iconY = y + (headerHeight - iconSize) / 2 + 2;
  
  drawPngIcon(doc, iconPath, categoryConfig.icon, iconX, iconY, iconSize, categoryConfig.bgColor, gradient[0]);
  
  // Label badge
  const labelX = x + 65;
  const labelY = y + 14;
  const labelWidth = 100;
  const labelHeight = 18;
  
  doc.roundedRect(labelX, labelY, labelWidth, labelHeight, 9)
     .fillColor(gradient[0])
     .fill();
  
  doc.roundedRect(labelX, labelY, labelWidth, labelHeight * 0.5, 9)
     .fillOpacity(0.25)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  doc.fontSize(8).font("Helvetica-Bold").fillColor("#FFFFFF");
  doc.text(categoryConfig.label, labelX, labelY + 4, {
    width: labelWidth,
    align: "center",
    lineBreak: false
  });
  
  doc.fontSize(6).font("Helvetica").fillColor("#64748B");
  doc.text("SECTION", labelX, labelY + labelHeight + 3, {
    width: labelWidth,
    align: "center",
    lineBreak: false
  });
  
  // Tier badge
  const tierConfig = TIER_CONFIG[tierColor] || TIER_CONFIG.GREEN;
  const tierBadgeX = x + boxWidth - 100;
  const tierBadgeY = y + 14;
  
  doc.roundedRect(tierBadgeX, tierBadgeY, 90, 24, 12)
     .fillColor(tierConfig.color)
     .fill();
  
  doc.roundedRect(tierBadgeX, tierBadgeY, 90, 12, 12)
     .fillOpacity(0.25)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  doc.fontSize(7).font("Helvetica-Bold").fillColor("#FFFFFF");
  doc.text(tierColor, tierBadgeX, tierBadgeY + 3, {
    width: 90,
    align: "center",
    lineBreak: false
  });
  
  doc.fontSize(6).font("Helvetica").fillColor("#FFFFFF");
  doc.text(tierConfig.label, tierBadgeX, tierBadgeY + 13, {
    width: 90,
    align: "center",
    lineBreak: false
  });
  
  doc.restore();
  
  return headerHeight;
};

/* ───────────────── APTITUDE LEGEND ───────────────── */
const drawAptitudeLegend = (doc, x, y, width) => {
  doc.save();
  
  const legendHeight = 24;
  const boxWidth = (width - 20) / 3;
  
  doc.roundedRect(x, y, width, legendHeight, 6)
     .fillColor("#F9FAFB")
     .fill();
  
  doc.roundedRect(x, y, width, legendHeight, 6)
     .lineWidth(0.5)
     .strokeColor(CARD_BORDER)
     .stroke();
  
  const items = [
    { color: APTITUDE_LEGEND.red.color, label: APTITUDE_LEGEND.red.label },
    { color: APTITUDE_LEGEND.yellow.color, label: APTITUDE_LEGEND.yellow.label },
    { color: APTITUDE_LEGEND.green.color, label: APTITUDE_LEGEND.green.label }
  ];
  
  items.forEach((item, index) => {
    const itemX = x + 10 + (boxWidth * index);
    const dotY = y + legendHeight / 2;
    
    doc.circle(itemX + 6, dotY, 5)
       .fillColor(item.color)
       .fill();
    
    doc.circle(itemX + 5, dotY - 1, 2)
       .fillOpacity(0.3)
       .fillColor("#FFFFFF")
       .fill();
    
    doc.fillOpacity(1);
    
    doc.fontSize(7).font("Helvetica-Bold").fillColor(TEXT_MAIN);
    doc.text(item.label, itemX + 16, y + 8, {
      width: boxWidth - 20,
      align: "left",
      lineBreak: false
    });
  });
  
  doc.restore();
  
  return legendHeight;
};

/* ───────────────── TIER SCALE LEGEND ───────────────── */
const drawTierScale = (doc, y, margins, width) => {
  const cardX = margins.left;
  const barW = width - margins.left - margins.right;
  const barH = 14;
  const radius = barH / 2;
  const segW = barW / 3;

  doc.roundedRect(cardX, y, barW, barH, radius)
     .fillColor("#E5E7EB")
     .fill();

  doc.roundedRect(cardX, y, segW, barH, radius)
     .fillColor("#22C55E")
     .fill();
  doc.roundedRect(cardX, y, segW, barH * 0.4, radius)
     .fillOpacity(0.25)
     .fillColor("#FFFFFF")
     .fill();

  doc.rect(cardX + segW, y, segW, barH)
     .fillOpacity(1)
     .fillColor("#EAB308")
     .fill();
  doc.rect(cardX + segW, y, segW, barH * 0.4)
     .fillOpacity(0.25)
     .fillColor("#FFFFFF")
     .fill();

  doc.roundedRect(cardX + segW * 2, y, segW, barH, radius)
     .fillOpacity(1)
     .fillColor("#EF4444")
     .fill();
  doc.roundedRect(cardX + segW * 2, y, segW, barH * 0.4, radius)
     .fillOpacity(0.25)
     .fillColor("#FFFFFF")
     .fill();

  doc.fillOpacity(1);

  doc.fontSize(7).font("Helvetica-Bold").fillColor("#FFFFFF")
     .text("GREEN – BEST", cardX, y + 3, { width: segW, align: "center" })
     .text("YELLOW – IDEAL", cardX + segW, y + 3, { width: segW, align: "center" })
     .text("RED – RISKY", cardX + segW * 2, y + 3, { width: segW, align: "center" });
};

/* ───────────────── FEES & SALARY SECTION (GLOSSY) ───────────────── */
const drawFeesAndSalarySection = (doc, feesData, salaryData, x, y, sectionWidth, gradientColors) => {
  doc.save();
  
  const padding = 10;
  const cardHeight = 70;
  const cardWidth = (sectionWidth - padding * 3) / 2;
  const totalHeight = cardHeight + padding + 22;
  
  // Section background
  doc.roundedRect(x, y, sectionWidth, totalHeight, 8)
     .fillColor(CARD_BG)
     .fill();
  
  // Glossy overlay
  doc.roundedRect(x, y, sectionWidth, totalHeight * 0.2, 8)
     .fillOpacity(0.04)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  // Top accent
  for (let i = 0; i < 3; i++) {
    doc.rect(x, y + i * 1, sectionWidth, 1)
       .fillOpacity(1 - i * 0.25)
       .fillColor(gradientColors[Math.min(i, gradientColors.length - 1)])
       .fill();
  }
  
  // Border
  doc.roundedRect(x, y, sectionWidth, totalHeight, 8)
     .strokeColor(gradientColors[0])
     .strokeOpacity(0.15)
     .lineWidth(0.5)
     .stroke();
  
  // Title
  doc.fontSize(9).font("Helvetica-Bold").fillOpacity(1).fillColor(PRIMARY_DARK);
  doc.text("Financial Overview", x + padding, y + 8, {
    width: sectionWidth - padding * 2,
    align: "center",
    lineBreak: false
  });
  
  const cardsY = y + 28;
  
  /* ─── FEES CARD ─── */
  const feesX = x + padding;
  
  doc.roundedRect(feesX, cardsY, cardWidth, cardHeight, 8)
     .fillColor("#FEF3C7")
     .fill();
  
  doc.roundedRect(feesX, cardsY, cardWidth, cardHeight * 0.3, 8)
     .fillOpacity(0.15)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  doc.roundedRect(feesX, cardsY, cardWidth, cardHeight, 8)
     .strokeColor("#F59E0B")
     .strokeOpacity(0.3)
     .lineWidth(0.5)
     .stroke();
  
  const feesIconSize = 28;
  const feesIconX = feesX + 8;
  const feesIconY = cardsY + 8;
  
  drawPngIcon(doc, SECTION_ICONS.fees, "₹", feesIconX, feesIconY, feesIconSize, "#FEF3C7", "#F59E0B");
  
  doc.fontSize(9).font("Helvetica-Bold").fillColor("#92400E");
  doc.text("Estimated Fees", feesX + feesIconSize + 14, cardsY + 10, { 
    width: cardWidth - feesIconSize - 22, 
    lineBreak: false 
  });
  
  doc.fontSize(7).font("Helvetica").fillColor("#78350F");
  let feesY = cardsY + 28;
  
  if (feesData.india) {
    doc.text(`India: ${feesData.india}`, feesX + feesIconSize + 14, feesY, { 
      width: cardWidth - feesIconSize - 20 
    });
    feesY += 14;
  }
  if (feesData.abroad) {
    doc.text(`Abroad: ${feesData.abroad}`, feesX + feesIconSize + 14, feesY, { 
      width: cardWidth - feesIconSize - 20 
    });
  }
  if (!feesData.india && !feesData.abroad) {
    doc.text("Varies by institution", feesX + feesIconSize + 14, feesY, { 
      width: cardWidth - feesIconSize - 20 
    });
  }
  
  /* ─── SALARY CARD ─── */
  const salaryX = x + padding * 2 + cardWidth;
  
  doc.roundedRect(salaryX, cardsY, cardWidth, cardHeight, 8)
     .fillColor("#D1FAE5")
     .fill();
  
  doc.roundedRect(salaryX, cardsY, cardWidth, cardHeight * 0.3, 8)
     .fillOpacity(0.15)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  doc.roundedRect(salaryX, cardsY, cardWidth, cardHeight, 8)
     .strokeColor("#10B981")
     .strokeOpacity(0.3)
     .lineWidth(0.5)
     .stroke();
  
  const salaryIconSize = 28;
  const salaryIconX = salaryX + 8;
  const salaryIconY = cardsY + 8;
  
  drawPngIcon(doc, SECTION_ICONS.salary, "$", salaryIconX, salaryIconY, salaryIconSize, "#D1FAE5", "#10B981");
  
  doc.fontSize(9).font("Helvetica-Bold").fillColor("#065F46");
  doc.text("Average Salary", salaryX + salaryIconSize + 14, cardsY + 10, { 
    width: cardWidth - salaryIconSize - 22, 
    lineBreak: false 
  });
  
  doc.fontSize(7).font("Helvetica").fillColor("#064E3B");
  let salaryY = cardsY + 28;
  
  if (salaryData.india) {
    doc.text(`India: ${salaryData.india}`, salaryX + salaryIconSize + 14, salaryY, { 
      width: cardWidth - salaryIconSize - 20 
    });
    salaryY += 14;
  }
  if (salaryData.abroad) {
    doc.text(`Abroad: ${salaryData.abroad}`, salaryX + salaryIconSize + 14, salaryY, { 
      width: cardWidth - salaryIconSize - 20 
    });
  }
  if (!salaryData.india && !salaryData.abroad) {
    doc.text("Competitive packages", salaryX + salaryIconSize + 14, salaryY, { 
      width: cardWidth - salaryIconSize - 20 
    });
  }
  
  doc.restore();
  
  return totalHeight;
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN GENERATOR - UPDATED WITH EMAIL ON STUDENT PROFILE PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export const generateAssessmentReport = ({
  studentProfile,
  signals,
  careers,
  studentPhotoPath = null, // Optional custom photo path
}) => {
  const doc = new PDFDocument({ size: "A4", margin: 40, bufferPages: true });
  const { width, height, margins } = doc.page;

  // Determine student photo path
  const photoPath = studentPhotoPath || STUDENT_PHOTO_PATH;

  const filePath = path.join(
    process.cwd(),
    "reports",
    `career-report-${studentProfile.studentId}.pdf`
  );
  

  fs.mkdirSync("reports", { recursive: true });
  doc.pipe(fs.createWriteStream(filePath));

  /* ═════════ PAGE 1: COVER PAGE (NEW) ═════════ */
  // Get student name for cover page
  const studentName = studentProfile.name || studentProfile.studentName || `Student ID: ${studentProfile.studentId}`;
  drawCoverPage(doc, width, height, studentName);

  /* ═════════ PAGE 2: STUDENT PROFILE - DATA LEFT, PHOTO RIGHT, EMAIL ADDED ═════════ */
  doc.addPage();
  drawPageBackground(doc, width, height);
  drawHeader(doc, margins, width, height, photoPath); // Pass photo to header
  drawFooter(doc, margins, width, height);
  drawWatermark(doc, width, height);

  const cardX = margins.left;
  const cardY = CONTENT_START_Y + 5;
  const cardW = width - margins.left - margins.right;
  const cardH = 180; // Increased height to accommodate email

  // Ultra light glossy card background
  doc.save();
  
  // Outer subtle shadow
  doc.roundedRect(cardX + 3, cardY + 3, cardW, cardH, 12)
     .fillOpacity(0.04)
     .fillColor("#000000")
     .fill();
  
  // Main card - ultra light background
  doc.roundedRect(cardX, cardY, cardW, cardH, 12)
     .fillColor(CARD_BG_ULTRA_LIGHT)
     .fill();
  
  // White inner layer
  doc.roundedRect(cardX + 1, cardY + 1, cardW - 2, cardH - 2, 11)
     .fillColor(CARD_BG)
     .fill();
  
  // Multiple glossy shine layers
  doc.roundedRect(cardX, cardY, cardW, cardH * 0.25, 12)
     .fillOpacity(0.06)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.roundedRect(cardX, cardY, cardW, cardH * 0.12, 12)
     .fillOpacity(0.04)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);

  // Sky blue gradient top accent
  doc.rect(cardX, cardY, cardW, 5).fillColor(PRIMARY).fill();
  doc.rect(cardX, cardY + 5, cardW, 2).fillOpacity(0.4).fillColor(PRIMARY_LIGHT).fill();
  doc.fillOpacity(1);

  // Very subtle border
  doc.roundedRect(cardX, cardY, cardW, cardH, 12)
     .strokeColor(PRIMARY)
     .strokeOpacity(0.12)
     .lineWidth(0.5)
     .stroke();
  doc.strokeOpacity(1);

  doc.restore();

  // Layout: Content on LEFT, Photo on RIGHT
  const photoSize = 100; // Square photo
  const photoX = cardX + cardW - photoSize - 30;
  const photoY = cardY + (cardH - photoSize) / 2 + 5;

  // Content area (left side)
  const contentX = cardX + 25;
  const contentW = photoX - contentX - 25;
  let contentY = cardY + 25;

  // Title with decorative elements
  doc.fontSize(14).font("Helvetica-Bold").fillColor(PRIMARY_DARK);
  doc.text("Student Profile", contentX, contentY, { width: contentW });

  contentY += 22;

  // Decorative gradient line
  doc.rect(contentX, contentY, 70, 3).fillColor(PRIMARY).fill();
  doc.rect(contentX + 70, contentY, 25, 3).fillOpacity(0.4).fillColor(PRIMARY_LIGHT).fill();
  doc.fillOpacity(1);

  contentY += 18;

  // Student details with bullet points - NOW INCLUDING EMAIL
  const detailLineHeight = 22;
  const details = [
    { label: "Student ID", value: studentProfile.studentId },
    { label: "Email", value: studentProfile.email || "Not provided" }, // EMAIL ADDED HERE
    { label: "Class", value: studentProfile.currentClass },
    { label: "Stream", value: studentProfile.stream },
    { label: "Family Budget", value: studentProfile.familyAnnualBudget }
  ];

  details.forEach((detail, index) => {
    const detailY = contentY + (index * detailLineHeight);
    
    // Bullet point with glossy effect
    doc.circle(contentX + 5, detailY + 5, 4)
       .fillColor(PRIMARY)
       .fill();
    
    doc.circle(contentX + 4, detailY + 4, 1.5)
       .fillOpacity(0.4)
       .fillColor("#FFFFFF")
       .fill();
    doc.fillOpacity(1);
    
    // Label and value
    doc.fontSize(9).font("Helvetica-Bold").fillColor(TEXT_MAIN);
    doc.text(`${detail.label}: `, contentX + 16, detailY, { continued: true });
    doc.font("Helvetica").fillColor(TEXT_MUTED);
    doc.text(detail.value);
  });

  // Draw square student photo on the RIGHT side with 3D frame
  drawStudentPhotoSquare(doc, photoPath, photoX, photoY, photoSize);

  // Description box BELOW the main card
  const descBoxY = cardY + cardH + 15;
  const descBoxH = 38;
  
  // Ultra light glossy description box
  doc.roundedRect(cardX, descBoxY, cardW, descBoxH, 8)
     .fillColor(CARD_BG_ULTRA_LIGHT)
     .fill();
  
  doc.roundedRect(cardX, descBoxY, cardW, descBoxH, 8)
     .fillColor(CARD_BG)
     .fill();
  
  // Glossy shine
  doc.roundedRect(cardX, descBoxY, cardW, descBoxH * 0.4, 8)
     .fillOpacity(0.05)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  // Left accent
  doc.rect(cardX, descBoxY + 4, 3, descBoxH - 8).fillColor(PRIMARY).fill();
  
  // Border
  doc.roundedRect(cardX, descBoxY, cardW, descBoxH, 8)
     .strokeColor(CARD_BORDER)
     .strokeOpacity(0.5)
     .lineWidth(0.5)
     .stroke();

  doc.fontSize(8).font("Helvetica").fillColor(TEXT_MUTED);
  doc.text(
    "This report summarises your aptitude, interests and profile, and recommends suitable streams and careers.",
    cardX + 15,
    descBoxY + 12,
    { width: cardW - 30, align: "center" }
  );

  // Professions illustration - increased card size for full image display
  const profCardY = descBoxY + descBoxH + 18;
  const profCardH = 160; // Reduced slightly to fit new layout

  drawGlossyCard(doc, cardX, profCardY, cardW, profCardH, 8, PRIMARY);

  if (fs.existsSync(PROFESSIONS_IMG_PATH)) {
    doc.image(PROFESSIONS_IMG_PATH, cardX + 10, profCardY + 10, {
      fit: [cardW - 20, profCardH - 20],
      align: "center",
      valign: "center",
    });
  }

  /* ═════════ PAGE 3: FRAMEWORK ILLUSTRATION ═════════ */
  addNewPage(doc, margins, width, height, photoPath);

  const fwCardX = margins.left;
  const fwCardY = CONTENT_START_Y;
  const fwCardW = width - margins.left - margins.right;
  const fwCardH = height - fwCardY - FOOTER_HEIGHT - 30;

  drawGlossyCard(doc, fwCardX, fwCardY, fwCardW, fwCardH, 8, PRIMARY);

  doc.fontSize(12).font("Helvetica-Bold").fillColor(PRIMARY_DARK)
     .text("Assessment Framework", fwCardX + 20, fwCardY + 18);

  doc.fontSize(8).font("Helvetica").fillColor(TEXT_MUTED)
     .text(
       "Your report is based on four pillars: Personality, Orientation Style, Interest and Aptitude. Together, they provide a holistic view of your profile.",
       fwCardX + 20,
       fwCardY + 36,
       { width: fwCardW - 40 }
     );

  if (fs.existsSync(FRAMEWORK_IMG_PATH)) {
    doc.image(FRAMEWORK_IMG_PATH, fwCardX + 30, fwCardY + 65, {
      width: fwCardW - 60,
      align: "center",
    });
  }

  const fwFooterY = fwCardY + fwCardH - 50;
  
  // Footer box with sky blue theme
  doc.roundedRect(fwCardX + 30, fwFooterY, fwCardW - 60, 36, 6)
     .fillColor(PRIMARY_DARK)
     .fill();
  
  doc.roundedRect(fwCardX + 30, fwFooterY, fwCardW - 60, 12, 6)
     .fillOpacity(0.15)
     .fillColor("#FFFFFF")
     .fill();
  
  doc.fillOpacity(1);
  
  doc.fontSize(8).font("Helvetica").fillColor("#FFFFFF")
     .text(
       "Next is your aptitude snapshot, followed by detailed career paths aligned to your strengths.",
       fwCardX + 42,
       fwFooterY + 12,
       { width: fwCardW - 84, align: "center" }
     );

  /* ═════════ PAGE 4: APTITUDE SNAPSHOT ═════════ */
  addNewPage(doc, margins, width, height, photoPath);

  const aptCardW = width - margins.left - margins.right;
  const aptCardX = margins.left;
  const aptCardY = CONTENT_START_Y;
  const aptCardH = 280;

  drawGlossyCard(doc, aptCardX, aptCardY, aptCardW, aptCardH, 8, PRIMARY);

  doc.x = aptCardX + 20;
  doc.y = aptCardY + 18;

  doc.fontSize(12).font("Helvetica-Bold").fillColor(PRIMARY_DARK)
     .text("Your Aptitude Snapshot");

  doc.moveDown(0.2);
  doc.fontSize(7).font("Helvetica").fillColor(TEXT_MUTED)
     .text(
       "Higher scores indicate stronger readiness in that area. Use this snapshot with your counsellor to decide focus areas."
     );

  doc.y += 8;
  const legendHeight = drawAptitudeLegend(doc, aptCardX + 20, doc.y, aptCardW - 40);
  doc.y += legendHeight + 12;

  const blockWidth = aptCardW - 40;
  const labelWidth = 140;
  const gapWidth = 12;
  const barWidth = blockWidth - labelWidth - gapWidth;
  const startX = aptCardX + 20;

  Object.entries(signals).forEach(([key, value]) => {
    const score = parseFloat(value || 0);
    const barLength = Math.max(0, Math.min(1, score / 100)) * barWidth;
    const currentY = doc.y;

    doc.fontSize(8).font("Helvetica-Bold").fillColor(TEXT_MAIN)
       .text(`${key.toUpperCase()}`, startX, currentY, {
         width: labelWidth,
         align: "left",
       });

    doc.fontSize(7).font("Helvetica").fillColor(TEXT_MUTED)
       .text(`${value}/100`, startX, currentY + 9, {
         width: labelWidth,
         align: "left",
       });

    const barX = startX + labelWidth + gapWidth;
    const barY = currentY + 4;

    doc.roundedRect(barX, barY, barWidth, 8, 4)
       .fillColor("#E5E7EB")
       .fill();

    let barColor = "#16A34A";
    if (score < 70) barColor = "#F59E0B";
    if (score < 40) barColor = "#EF4444";

    doc.roundedRect(barX, barY, barLength, 8, 4)
       .fillColor(barColor)
       .fill();
    
    if (barLength > 10) {
      doc.roundedRect(barX, barY, barLength, 3, 4)
         .fillOpacity(0.25)
         .fillColor("#FFFFFF")
         .fill();
      doc.fillOpacity(1);
    }

    if (barLength > 20) {
      doc.fontSize(6).font("Helvetica-Bold").fillColor("#FFFFFF")
         .text(`${Math.round(score)}%`, barX + barLength - 20, barY + 1, {
           width: 18,
           align: "center",
         });
    }

    doc.y = currentY + 22;
  });

  /* ═════════ CAREER PAGES ═════════ */
  careers.forEach((career) => {
    addNewPage(doc, margins, width, height, photoPath);

    drawTierScale(doc, CONTENT_START_Y - 12, margins, width);
    
    doc.fontSize(7).font("Helvetica").fillColor(TEXT_MUTED)
       .text(
         "Green = best-fit, Yellow = suitable, Red = higher risk",
         margins.left,
         CONTENT_START_Y + 5,
         { width: width - margins.left - margins.right, align: "center" }
       );

    const cardX2 = margins.left;
    let cardY2 = CONTENT_START_Y + 18;
    const cardW2 = width - margins.left - margins.right;
    const cardH2 = height - cardY2 - FOOTER_HEIGHT - 12;

    const category = getCareerCategory(career.name);
    const categoryConfig = CAREER_CATEGORIES[category];

    // Ultra light card background
    doc.roundedRect(cardX2, cardY2, cardW2, cardH2, 10)
       .fillColor(CARD_BG_ULTRA_LIGHT)
       .fill();
    
    doc.roundedRect(cardX2 + 1, cardY2 + 1, cardW2 - 2, cardH2 - 2, 9)
       .fillColor(CARD_BG)
       .fill();
    
    doc.roundedRect(cardX2, cardY2, cardW2, cardH2 * 0.06, 10)
       .fillOpacity(0.03)
       .fillColor("#FFFFFF")
       .fill();
    doc.fillOpacity(1);
    
    drawAdvancedGradientBorder(doc, cardX2, cardY2, cardW2, cardH2, categoryConfig.gradient, 2, 10);

    const headerHeight = drawDepartmentHeader(doc, career.name, cardX2 + 8, cardY2 + 8, cardW2 - 16, career.tier);

    const innerX = cardX2 + 16;
    let y = cardY2 + headerHeight + 22;

    doc.fontSize(12).font("Helvetica-Bold").fillColor(PRIMARY_DARK)
       .text(career.name, innerX, y, { width: cardW2 - 32 });

    y += 18;

    doc.fontSize(8).font("Helvetica").fillColor(TEXT_MUTED)
       .text(`Compatibility score: ${career.compatibilityScore}%`, innerX, y);

    y += 20;

    const colGap = 18;
    const colWidth = (cardW2 - 32 - colGap) / 2;
    const sectionCardHeight = 140;

    // Left column: Roles
    const leftHeaderHeight = drawGlossySectionCard(
      doc, innerX, y, colWidth, sectionCardHeight,
      "Career options (India)", categoryConfig.gradient, 8
    );

    let yLeft = y + leftHeaderHeight + 8;
    doc.fontSize(7.5).font("Helvetica").fillColor(TEXT_MAIN);
    safe(career.roles).slice(0, 5).forEach((r) => {
      doc.text(`• ${r}`, innerX + 10, yLeft, { width: colWidth - 20 });
      yLeft += 11;
    });

    // Career options abroad
    let abroadCardY = y + sectionCardHeight + 10;
    if (safe(career.rolesAbroad).length) {
      const abroadCardHeight = 100;
      drawGlossySectionCard(
        doc, innerX, abroadCardY, colWidth, abroadCardHeight,
        "Career options (Abroad)", categoryConfig.gradient, 8
      );
      
      let yAbroad = abroadCardY + 28 + 8;
      doc.fontSize(7.5).font("Helvetica").fillColor(TEXT_MAIN);
      safe(career.rolesAbroad).slice(0, 4).forEach((r) => {
        doc.text(`• ${r}`, innerX + 10, yAbroad, { width: colWidth - 20 });
        yAbroad += 11;
      });
    }

    // Right column: Institutes
    let xRight = innerX + colWidth + colGap;
    
    drawGlossySectionCard(
      doc, xRight, y, colWidth, sectionCardHeight,
      "Top institutes (India)", categoryConfig.gradient, 8
    );

    let yRight = y + leftHeaderHeight + 8;
    doc.fontSize(7.5).font("Helvetica").fillColor(TEXT_MAIN);
    safe(career.bestInstitutesIndia).slice(0, 5).forEach((iName) => {
      doc.text(`• ${iName}`, xRight + 10, yRight, { width: colWidth - 20 });
      yRight += 11;
    });

    // Institutes abroad
    if (safe(career.bestInstitutesAbroad).length) {
      const abroadInstCardHeight = 100;
      drawGlossySectionCard(
        doc, xRight, abroadCardY, colWidth, abroadInstCardHeight,
        "Top institutes (Abroad)", categoryConfig.gradient, 8
      );
      
      let yInstAbroad = abroadCardY + 28 + 8;
      doc.fontSize(7.5).font("Helvetica").fillColor(TEXT_MAIN);
      safe(career.bestInstitutesAbroad).slice(0, 3).forEach((iName) => {
        doc.text(`• ${iName}`, xRight + 10, yInstAbroad, { width: colWidth - 20 });
        yInstAbroad += 11;
      });
    }

    const contentEndY = safe(career.rolesAbroad).length ? abroadCardY + 110 : y + sectionCardHeight + 10;
    const feesHeight = 105;
    
    // Career image
    const source = (career.code || career.name || "").toUpperCase();
    const imageKey = Object.keys(CAREER_IMAGE_MAP).find(key =>
      source.includes(key.split("_")[0])
    );
    const imageFile = imageKey ? CAREER_IMAGE_MAP[imageKey] : null;

    const finalBandY = cardY2 + cardH2 - feesHeight - 8;
    const spaceForImage = finalBandY - contentEndY - 15;
    
    if (imageFile && spaceForImage > 80) {
      const imagePath = path.join(ASSETS_DIR, imageFile);

      if (fs.existsSync(imagePath)) {
        const imageHeight = Math.min(spaceForImage - 10, 100);
        const imageWidth = imageHeight * 1.6;
        const imageX = cardX2 + (cardW2 - imageWidth) / 2;
        const imageY = contentEndY + (spaceForImage - imageHeight) / 2;

        // Image frame with 3D effect
        doc.roundedRect(imageX - 6, imageY - 6, imageWidth + 12, imageHeight + 12, 8)
           .fillColor("#F9FAFB")
           .fill();
        
        doc.roundedRect(imageX - 6, imageY - 6, imageWidth + 12, (imageHeight + 12) * 0.25, 8)
           .fillOpacity(0.08)
           .fillColor("#FFFFFF")
           .fill();
        
        doc.fillOpacity(1);
        
        doc.roundedRect(imageX - 6, imageY - 6, imageWidth + 12, imageHeight + 12, 8)
           .strokeColor(categoryConfig.gradient[0])
           .strokeOpacity(0.15)
           .lineWidth(0.5)
           .stroke();

        doc.image(imagePath, imageX, imageY, {
          width: imageWidth,
          height: imageHeight,
          align: "center",
          valign: "center",
        });
      }
    }

    // Fees & Salary section
    const feesData = {
      india: career.feesIndia || null,
      abroad: career.feesAbroad || null
    };
    const salaryData = {
      india: career.salaryIndia || null,
      abroad: career.salaryAbroad || null
    };
    
    drawFeesAndSalarySection(
      doc,
      feesData,
      salaryData,
      cardX2 + 12,
      finalBandY,
      cardW2 - 24,
      categoryConfig.gradient
    );
  });

  /* ═════════ FINAL NOTE PAGE ═════════ */
  addNewPage(doc, margins, width, height, photoPath);

  const contentAreaStart = CONTENT_START_Y;
  const contentAreaEnd = height - FOOTER_HEIGHT - 15;
  const contentAreaHeight = contentAreaEnd - contentAreaStart;
  const verticalCenter = contentAreaStart + contentAreaHeight / 2;

  const finalCardW = width - margins.left - margins.right;
  const finalCardH = 200;
  const finalCardX = margins.left;
  const finalCardY = verticalCenter - finalCardH / 2;

  drawGlossyCard(doc, finalCardX, finalCardY, finalCardW, finalCardH, 8, PRIMARY);

  let yFinal = finalCardY + 28;
  const xFinal = finalCardX + 24;
  const wInner = finalCardW - 48;

  doc.moveTo(xFinal, yFinal)
     .lineTo(xFinal + 70, yFinal)
     .lineWidth(2)
     .strokeColor(PRIMARY)
     .stroke();
  yFinal += 16;

  doc.fontSize(14).font("Helvetica-Bold").fillColor(PRIMARY_DARK)
     .text("Final Note", xFinal, yFinal, { width: wInner, align: "left" });

  yFinal += 28;

  doc.fontSize(9).font("Helvetica").fillColor(TEXT_MAIN)
     .text(
       "This handbook is a decision-support tool — not a verdict. Careers evolve with effort, exposure and adaptability.",
       xFinal,
       yFinal,
       { width: wInner, align: "left" }
     );

  yFinal += 40;

  doc.fontSize(8).font("Helvetica").fillColor(TEXT_MUTED)
     .text(
       "Use these insights as a compass to explore streams and careers that resonate with your strengths and interests. Discuss this report with your parents, teachers and counsellors before taking final decisions.",
       xFinal,
       yFinal,
       { width: wInner, align: "left" }
     );

  yFinal += 50;

  doc.fontSize(10).font("Helvetica-Bold").fillColor(PRIMARY)
     .text("Keep exploring. Keep growing. Keep dreaming!", xFinal, yFinal, {
       width: wInner,
       align: "left",
     });

/* ═════════ ADD THIS AT THE TOP WITH YOUR OTHER CONSTANTS ═════════ */
const CAREER_COUNSELLING_CENTER_IMG = path.join(
  process.cwd(),
  "src",
  "assets",
  "career-counselling.png"
);

// OR if using a different path structure:
// const CAREER_COUNSELLING_CENTER_IMG = "./assets/career-counselling.png";

/* ═════════ CAREER COUNSELLING PAGE (LAST PAGE) ═════════ */

// ❌ HEADER & FOOTER REMOVED

doc.addPage({ size: [width, height], margins });

const counsellingPageStart = margins.top + 30;

/* ================= MAIN CARD ================= */
const counsellingCardW = width - margins.left - margins.right;
const counsellingCardH = 700;
const counsellingCardX = margins.left;
const counsellingCardY = counsellingPageStart;

// Card background
doc.save();
doc.roundedRect(counsellingCardX + 4, counsellingCardY + 4, counsellingCardW, counsellingCardH, 12)
   .fillOpacity(0.06)
   .fillColor("#000")
   .fill();
doc.roundedRect(counsellingCardX, counsellingCardY, counsellingCardW, counsellingCardH, 12)
   .fillColor(CARD_BG_ULTRA_LIGHT)
   .fill();
doc.roundedRect(counsellingCardX + 1, counsellingCardY + 1, counsellingCardW - 2, counsellingCardH - 2, 11)
   .fillColor(CARD_BG)
   .fill();

// Accent bar
doc.rect(counsellingCardX, counsellingCardY, counsellingCardW, 6).fillColor(PRIMARY_DARK).fill();
doc.rect(counsellingCardX, counsellingCardY + 6, counsellingCardW, 3).fillOpacity(0.5).fillColor(PRIMARY).fill();
doc.fillOpacity(1);
doc.restore();

/* ================= CARD CONTENT ================= */
let counsellingY = counsellingCardY + 35;
const counsellingX = counsellingCardX + 30;
const counsellingInnerW = counsellingCardW - 60;

// ================= ICON BACKGROUND =================
const circleCenterX = counsellingX + 20;
const circleCenterY = counsellingY + 20;
const circleRadius = 18;

doc
  .circle(circleCenterX, circleCenterY, circleRadius)
  .fillColor(PRIMARY)
  .fill();

// ================= ICON IMAGE =================
const ICON_PATH = path.join(process.cwd(), "src/assets/icons/counselling.png");

if (fs.existsSync(ICON_PATH)) {
  const iconSize = 20; // SAFE size inside 18 radius circle

  doc.image(
    ICON_PATH,
    circleCenterX - iconSize / 2,
    circleCenterY - iconSize / 2,
    {
      width: iconSize,
      height: iconSize
    }
  );
}

// Heading
doc.fontSize(20).font("Helvetica-Bold").fillColor(PRIMARY_DARK);
doc.text("GOT ANY QUESTIONS?", counsellingX + 50, counsellingY - 5, {
  width: counsellingInnerW - 60
});
counsellingY += 30;

// Subheading
doc.fontSize(14).font("Helvetica-Bold").fillColor(TEXT_MAIN);
doc.text("Consult with our experts", counsellingX + 50, counsellingY, {
  width: counsellingInnerW - 60
});
counsellingY += 25;

/* ================= CENTER IMAGE ================= */
const imgWidth = counsellingInnerW - 120;
const imgHeight = 500;
const imgX = margins.left + (counsellingCardW - imgWidth) / 2;
const imgY = counsellingY;

// Check if image exists before using
if (fs.existsSync(CAREER_COUNSELLING_CENTER_IMG)) {
  doc.roundedRect(imgX - 5, imgY - 5, imgWidth + 10, imgHeight + 10, 12)
     .fillColor("#F9FAFB")
     .fill();

  doc.save();
  doc.roundedRect(imgX, imgY, imgWidth, imgHeight, 10).clip();
  doc.image(CAREER_COUNSELLING_CENTER_IMG, imgX, imgY, {
    width: imgWidth,
    height: imgHeight,
    fit: [imgWidth, imgHeight],
    align: "center",
    valign: "center"
  });
  doc.restore();
} else {
  console.warn("Career counselling image not found at:", CAREER_COUNSELLING_CENTER_IMG);
}

counsellingY = imgY + imgHeight + 25;

/* ================= CONTACT INFO ================= */
const contactBoxH = 45;
doc.roundedRect(counsellingX - 10, counsellingY, counsellingInnerW + 20, contactBoxH, 8)
   .fillColor("#F0F9FF")
   .fill();
doc.roundedRect(counsellingX - 10, counsellingY, counsellingInnerW + 20, contactBoxH, 8)
   .strokeColor(PRIMARY)
   .strokeOpacity(0.15)
   .stroke();

const centerY = counsellingY + contactBoxH / 2;
const colW = (counsellingInnerW + 20) / 2;

/* 📞 Mobile Icon Background */
doc.circle(counsellingX + 10, centerY, 12)
   .fillColor(PRIMARY)
   .fill();

/* ✅ PNG Phone Icon */
if (fs.existsSync(MOBILE_ICON)) {
  doc.image(MOBILE_ICON,
    counsellingX + 10 - 8,  // center align X
    centerY - 8,            // center align Y
    {
      width: 16,
      height: 16
    }
  );
} else {
  console.log("❌ Mobile icon not found:", MOBILE_ICON);
}

/* Mobile Text */
doc.fontSize(9)
   .fillColor(TEXT_MAIN)
   .text("Mobile:", counsellingX + 28, centerY - 10);

doc.fontSize(10)
   .fillColor(PRIMARY_DARK)
   .text(CONTACT_INFO.mobile, counsellingX + 28, centerY + 2, {
     link: `tel:${CONTACT_INFO.mobile.replace(/[^0-9+]/g, "")}`,
     underline: true
   });


/* ✉ Email */
const emailX = counsellingX + colW;

doc.circle(emailX + 10, centerY, 12)
   .fillColor(PRIMARY)
   .fill();

/* ✅ PNG Email Icon */
const EMAIL_ICON = path.join(__dirname, "../assets/icons/email.png");

if (fs.existsSync(EMAIL_ICON)) {
  doc.image(EMAIL_ICON, emailX + 2, centerY - 6, {
    width: 16,
    height: 16
  });
} else {
  console.log("Email icon not found:", EMAIL_ICON);
}

/* Email Text */
doc.fontSize(9)
   .fillColor(TEXT_MAIN)
   .text("Email:", emailX + 28, centerY - 10);

doc.fontSize(10)
   .fillColor(PRIMARY_DARK)
   .text(CONTACT_INFO.email, emailX + 28, centerY + 2, {
     link: `mailto:${CONTACT_INFO.email}`,
     underline: true
   });

doc.end();


//DON'T CHANGE THIS LINES
const fileName = path.basename(filePath);



return {
  reportUrl: `/reports/${fileName}`
};
};