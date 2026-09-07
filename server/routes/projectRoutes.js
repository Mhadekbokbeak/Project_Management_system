const express = require("express");
const router = express.Router();

const { getProject, createProject , deleteProject} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

// บังคับว่าการจัดการ Project ต้องใช้ Token เสมอ
router.use(protect);

router.route("/").get(getProject).post(createProject);
router.route("/:id").delete(deleteProject);

module.exports = router;

