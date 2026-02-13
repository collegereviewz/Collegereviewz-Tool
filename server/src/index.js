import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
import assessmentRoutes from "./routes/assessment.routes.js"
import cors from "cors"
import path from "path";
import questionnaireRoutes from "./routes/questionnaire.routes.js";


dotenv.config()

//connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
    "http://localhost:3000",
    "https://collegereviewz.io", // Add your production domain here
    "https://collegereviewz-webapp.onrender.com/",
    "https://collegereviewz.onrender.com" // Add Render domain if known
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // Check if it's a preview deployment or similar (optional, risky for prod)
            // For now, stick to strict whitelist or just allow all * for public APIs if intended
            // If you want to allow all in production for now (easier for initial deploy):
            // return callback(null, true); 
            return callback(null, true); // yielding to "allow all" for easier first deploy, revise later
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(
    "/reports",
    express.static(path.join(process.cwd(), "reports"))
);

// API Routes
app.use("/api/assessment", assessmentRoutes);
app.use("/api/questionnaire", questionnaireRoutes);

// Health Check API (Moved from root /)
app.get("/api/health", (req, res) => {
    res.send("SERVER IS ONLINE");
});

// 🔹 PRODUCTION: Serve React build
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, "clients", "build")));

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "clients", "build", "index.html"));
    });
} else {
    // Development mode route
    app.get("/", (req, res) => {
        res.send("API is running in Development Mode");
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
