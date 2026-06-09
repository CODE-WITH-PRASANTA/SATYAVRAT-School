const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= DB ================= */
const connectDB = require("./src/configs/db");

/* ================= ROUTES ================= */

const newsRoutes = require("./src/routes/newsposting.routes");
const teacherRoutes = require("./src/routes/teacher.routes");
const galleryRoutes = require("./src/routes/gallery.routes");
const enquiryRoutes = require("./src/routes/coldlead.routes");
const admissionRoutes = require("./src/routes/admission.routes");

const expenseRoutes = require("./src/routes/expense.routes");
const expenseHeadRoutes = require("./src/routes/expenseHead.routes");
const classRoutes = require("./src/routes/class.routes");


const testimonialRoutes = require("./src/routes/testimonial.routes");
const expensesHead = require("./src/routes/expenseHeadRoutes")
const bannerRoutes= require("./src/routes/banner.routes");
const subjectRoutes = require("./src/routes/subject.routes");
const classPostRoutes = require("./src/routes/classPost.routes");



/* ================= INIT APP ================= */
const app = express();

/* ================= CONNECT DB ================= */
connectDB();

/* ================= GLOBAL MIDDLEWARE ================= */
app.use(
  cors({
    origin: "*", // ⚠️ change in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
/* VERY IMPORTANT for image access */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= API ROUTES ================= */

/* CORE */
app.use("/api/news", newsRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/students", admissionRoutes);

app.use("/api/expenses", expenseRoutes);
app.use("/api/expense-head",expensesHead );
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/classwise-subjects", classWiseSubjectRoutes);
app.use("/api/banner",bannerRoutes);



app.use("/api/testimonials", testimonialRoutes);

/* STUDENT + ENQUIRY */
app.use("/api/students", admissionRoutes);
app.use("/api/enquiries", enquiryRoutes);

/* ACADEMIC */
app.use("/api/classes", classRoutes);


/* SUBJECT (YOUR CURRENT MODULE) */
app.use("/api/subjects", subjectRoutes);

/* FINANCE */
app.use("/api/expenses", expenseRoutes);

app.use("/api/expense-head", expenseHeadRoutes);

app.use("/api/class-post", classPostRoutes);




/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 API Running Successfully",
  });
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});