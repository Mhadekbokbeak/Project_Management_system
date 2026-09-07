const express = require("express");
const { getTasks,createTask,updateTask,deleteTask} = require("../controllers/taskController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();


// บังคับใช้ Middleware protect กับทุก Route ในไฟล์นี้
router.use(protect);

router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
