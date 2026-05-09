const express = require("express");

const router = express.Router();

const {
  createComment,
  getComments,
  getAllComments,
  updateCommentStatus,
  deleteComment,
} = require(
  "../controllers/newscomment.controller"
);

/* ================= CREATE ================= */

router.post("/", createComment);

/* ================= GET BLOG COMMENTS ================= */

router.get(
  "/blog/:blogId",
  getComments
);

/* ================= ADMIN GET ALL ================= */

router.get(
  "/admin/all",
  getAllComments
);

/* ================= UPDATE STATUS ================= */

router.put(
  "/:id/status",
  updateCommentStatus
);

/* ================= DELETE ================= */

router.delete("/:id", deleteComment);

module.exports = router;