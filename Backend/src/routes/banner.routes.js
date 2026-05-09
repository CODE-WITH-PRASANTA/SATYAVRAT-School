const express = require("express");

const router = express.Router();

const {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/banner.controller");

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

// ================= CREATE =================

router.post(
  "/create",
  upload.single("image"),
  convertToWebp,
  createBanner
);

// ================= GET ALL =================

router.get("/", getAllBanners);

// ================= GET SINGLE =================

router.get("/:id", getSingleBanner);

// ================= UPDATE =================

router.put(
  "/update/:id",
  upload.single("image"),
  convertToWebp,
  updateBanner
);

// ================= DELETE =================

router.delete(
  "/delete/:id",
  deleteBanner
);

module.exports = router;