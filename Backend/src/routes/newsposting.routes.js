const express = require("express");
const router = express.Router();

const {
  createNews,
  getNews,
  updateNews,
  deleteNews,
  toggleStatus,
} = require("../controllers/newsposting.controller");

const { upload, convertToWebp } = require("../middlewares/upload");

/* ================= ROUTES ================= */

/* GET ALL NEWS */
router.get("/", getNews);

/* CREATE NEWS */
router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    if (req.file) return convertToWebp(req, res, next);
    next();
  },
  createNews
);

/* UPDATE NEWS */
router.put(
  "/:id",
  upload.single("image"),
  (req, res, next) => {
    if (req.file) return convertToWebp(req, res, next);
    next();
  },
  updateNews
);

/* DELETE NEWS */
router.delete("/:id", deleteNews);

/* TOGGLE STATUS */
router.put("/:id/status", toggleStatus);

module.exports = router;