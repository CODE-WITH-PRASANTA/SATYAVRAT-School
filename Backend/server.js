const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: "./.env" });

console.log("ENV CHECK:", process.env.MONGO_URI);

const connectDB = require("./src/configs/db");

// Routes
const teacherRoutes = require("./src/routes/teacher.routes");

// Connect DB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ REQUIRED for images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/teachers", teacherRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API is Running..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});