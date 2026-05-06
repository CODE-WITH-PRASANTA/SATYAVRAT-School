const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/* ================= CONFIG ================= */
dotenv.config();

/* ================= DB ================= */
const connectDB = require("./src/configs/db");

/* ================= ROUTES ================= */
const newsRoutes = require("./src/routes/newsposting.routes");
const teacherRoutes = require("./src/routes/teacher.routes");
const galleryRoutes = require("./src/routes/gallery.routes");
const enquiryRoutes = require("./src/routes/coldlead.routes");
const admissionRoutes = require("./src/routes/admission.routes");

const expenseRoutes = require("./src/routes/expenseRoutes");
const expenseHeadRoutes = require("./src/routes/expenseHeadRoutes");

const classRoutes = require("./src/routes/class.routes");
const subjectRoutes = require("./src/routes/subject.routes");

const testimonialRoutes = require("./src/routes/testimonial.routes");

/* ================= MIDDLEWARE ================= */


/* ================= INIT ================= */
const app = express();

/* ================= DB CONNECT ================= */
connectDB();

/* ================= GLOBAL MIDDLEWARE ================= */

// CORS (secure config)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // use env in production
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= API ROUTES ================= */

app.use("/api/news", newsRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/students", admissionRoutes);

app.use("/api/expenses", expenseRoutes);
app.use("/api/expense-head", expenseHeadRoutes);

// 🔥 CORE MODULES (IMPORTANT)
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);

app.use("/api/testimonials", testimonialRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 API Running Successfully",
  });
});

/* ================= ERROR HANDLING ================= */

// 404 middleware


// Global error handler


/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});