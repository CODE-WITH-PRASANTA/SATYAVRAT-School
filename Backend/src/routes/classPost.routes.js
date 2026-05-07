const express = require("express");

const router = express.Router();

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

const {
  createClassPost,
  getAllClassPosts,
  deleteClassPost,
  updateClassPost,
} = require("../controllers/classPost.controller");

/* =========================
   CREATE CLASS POST
========================= */

router.post(
  "/create",
  upload.single("uploadImage"),
  convertToWebp,
  createClassPost
);

/* =========================
   GET ALL POSTS
========================= */

router.get("/", getAllClassPosts);

/* =========================
   DELETE POST
========================= */

router.delete("/:id", deleteClassPost);

/* =========================
   UPDATE POST
========================= */

router.put(
  "/:id",
  upload.single("uploadImage"),
  convertToWebp,
  updateClassPost
);

module.exports = router;