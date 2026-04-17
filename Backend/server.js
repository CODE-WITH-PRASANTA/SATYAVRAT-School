const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/* DB IMPORT */
const connectDB = require("./src/configs/db");

/* ROUTES */
const newsRoutes = require("./src/routes/newsposting.routes");
<<<<<<< HEAD
const teacherRoutes = require("./src/routes/teacher.routes");
const galleryRoutes = require("./src/routes/gallery.routes");
const enquiryRoutes = require("./src/routes/coldlead.routes");

=======
const testimonialRoutes = require("./src/routes/testimonial.routes");
>>>>>>> 9fcf468fee8d4529ad9611f0e0073a9c903b8540


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
<<<<<<< HEAD
app.use("/api/news", newsRoutes);   // ✅ FIXED
app.use("/api/teachers", teacherRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);
=======
app.use("/api/news", newsRoutes);  
app.use("/api", testimonialRoutes);
>>>>>>> 9fcf468fee8d4529ad9611f0e0073a9c903b8540


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