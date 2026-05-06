const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/* DB IMPORT */
const connectDB = require("./src/configs/db");

/* ROUTES */
const newsRoutes = require("./src/routes/newsposting.routes");
const teacherRoutes = require("./src/routes/teacher.routes");
const galleryRoutes = require("./src/routes/gallery.routes");
const enquiryRoutes = require("./src/routes/coldlead.routes");
const admissionRoutes = require("./src/routes/admission.routes");

const expenseRoutes = require("./src/routes/expenseRoutes");
const classRoutes = require("./src/routes/class.routes");
const subjectRoutes = require("./src/routes/subject.routes");
const classWiseSubjectRoutes = require("./src/routes/classWiseSubject.routes");


const testimonialRoutes = require("./src/routes/testimonial.routes");
const expensesHead = require("./src/routes/expenseHeadRoutes")


/* LOAD ENV */
dotenv.config();

/* CONNECT DATABASE */
connectDB();

/* INIT APP */
const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FOLDER */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ROUTES */
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



app.use("/api/testimonials", testimonialRoutes);

/* DEFAULT ROUTE */
app.get("/", (req, res) => {
  res.send("🚀 API Running Successfully");
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

/* SERVER START */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});