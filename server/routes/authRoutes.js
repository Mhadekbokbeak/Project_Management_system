const express = require("express");
const router = express.Router();
const { registerUser,loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register",registerUser);
router.post("/login",loginUser);

// [GET] /api/auth/me (ทดสอบ API ที่ต้องใช้ Token ในการเข้าถึง)
// สังเกตว่าเราแทรก protect ไว้ตรงกลาง
router.get("/me",protect,(req,res) => {
    // ถ้าผ่าน protect มาได้ แปลว่ามี Token ที่ถูกต้อง ระบบจะส่งข้อมูล User นั้นกลับไป
    res.status(200).json(req.user);
})

module.exports = router; 