const express = require("express");
const router = express.Router();

const {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery.controllers");

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

/* ROUTES */
router.get("/", getGallery);

router.post("/", upload.single("image"), convertToWebp, createGallery);

router.put("/:id", upload.single("image"), convertToWebp, updateGallery);

router.delete("/:id", deleteGallery);

module.exports = router;