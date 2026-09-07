const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const protect = async (req,res,next) => {
    let token;

    // Check Header have send Authorization yet ? -> happened with "Bearer"
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try{
            // Split specially Token (model is Bearer per with token this)
            token = req.headers.authorization.split(" ")[1];

            // ถอดรหัส Token ด้วย Secret Key ตัวเดียวกับตอนสร้าง
            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            // ค้นหา User จาก ID ที่ถอดรหัสได้ แล้วเก็บไว้ใน req.user (ไม่เอา password)
            // เพื่อให้ API ถัดไปสามารถดึงข้อมูล req.user ไปใช้งานต่อได้เลย
            req.user = await User.findById(decoded.id).select("-password");


            //ให้ทำงานในส่วนของ Route ถัดไปได้
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token ไม่ถูกต้อง หรือหมดอายุ"})
        }
        
    }

    // If not have token
    if(!token){
        return res.status(401).json({message:"ไม่ได้รับอนุญาตให้เข้าถึง (ไม่มี Token)"});
    }
};

module.exports = { protect };