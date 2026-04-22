const express = require("express");
const router = express.Router();

const controller = require("../controllers/admission.controllers");

router.get("/", controller.getAdmissions);
router.get("/:id", controller.getAdmission);
router.post("/", controller.createAdmission);
router.put("/:id", controller.updateAdmission);
router.delete("/:id", controller.deleteAdmission);

module.exports = router;