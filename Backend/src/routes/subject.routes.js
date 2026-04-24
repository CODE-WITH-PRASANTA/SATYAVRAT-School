const express = require("express");
const router = express.Router();

const { upload, convertToWebp } = require("../middlewares/upload");
const {
    createSubject,
    getSubjects,
    updateSubject,
    deleteSubject,
} = require("../controllers/subject.controller");

router.post(
    "/",
    upload.single("image"),
    convertToWebp,
    createSubject
); router.get("/", getSubjects);
router.put(
    "/:id",
    upload.single("image"),
    convertToWebp,
    updateSubject
); router.delete("/:id", deleteSubject);

module.exports = router;