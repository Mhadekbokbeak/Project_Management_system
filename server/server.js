const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// connected DB
connectDB();

// const User = require("./models/User"); // เรียกใช้ User Model ที่สร้างไว้ในข้อ


const app = express();

app.use(cors());
// Middleware สำหรับอ่านข้อมูล JSON (ใส่ไว้รองรับ POST/PUT request)
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks",require("./routes/taskRoutes"));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});