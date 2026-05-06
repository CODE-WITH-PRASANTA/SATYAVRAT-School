const router = require("express").Router();
const ctrl = require("../controllers/classController");

router.post("/", ctrl.createClass);
router.get("/", ctrl.getClasses);
router.put("/:id", ctrl.updateClass);
router.delete("/:id", ctrl.deleteClass);

module.exports = router;