const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: "./.env" });

console.log("ENV CHECK:", process.env.MONGO_URI);

const connectDB = require("./src/configs/db");

// ✅ Import Routes (FIXED)
const testimonialRoutes = require("./src/routes/testimonial.routes");
// Routes
const teacherRoutes = require("./src/routes/teacher.routes");

// Connect DB
connectDB();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/teachers", teacherRoutes);

/* Test Route */
// ✅ Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ REQUIRED for images
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("🚀 API is Running..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});