import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db/db.js"
import assessmentRoutes from "./routes/assessment.routes.js"
import cors from "cors"
import path from "path";

dotenv.config()

//connect to database
connectDB();

const app=express() ;
const PORT=process.env.PORT || 5000
app.use(cors({
    origin:"http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  
}));
app.use(
    "/reports",
    express.static(path.join(process.cwd(), "reports"))
  );
  

// 🔹 Allow frontend in dev only
if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:3000" }));
}

//middleware
app.use(express.json());
app.use("/api/assessment", assessmentRoutes);

// 🔹 PRODUCTION: Serve React build
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "clients/build")));
  
    app.get("/*splat", (req, res) => {
      res.sendFile(path.join(__dirname, "clients/build", "index.html"));
    });
}


//test route
app.get("/",(req,res)=>{
    res.send("SERVER IS ONLINE");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
