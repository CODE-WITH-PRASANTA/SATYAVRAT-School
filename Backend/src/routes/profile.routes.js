const express = require("express");

const router = express.Router();


const {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
} = require("../controllers/profile.controllers");


const {
  upload,
  convertToWebp
} = require("../middlewares/upload");



// =============================
// GET PROFILE
// =============================

router.get(
  "/",
  getProfile
);



// =============================
// UPDATE PROFILE
// =============================

router.put(
  "/",
  updateProfile
);



// =============================
// UPLOAD AVATAR
// =============================

router.post(
  "/upload-avatar",
  upload.single("avatar"),
  convertToWebp,
  uploadAvatar
);



// =============================
// DELETE AVATAR
// =============================

router.delete(
  "/avatar",
  deleteAvatar
);



module.exports = router;