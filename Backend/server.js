const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

// DEBUG
console.log("ENV CHECK:", process.env.MONGO_URI);

const connectDB = require("./src/configs/db");

// ✅ Import Routes (FIXED)
const testimonialRoutes = require("./src/routes/testimonial.routes");

// Connect DB
connectDB();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/testimonials", testimonialRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("🚀 API is Running..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});