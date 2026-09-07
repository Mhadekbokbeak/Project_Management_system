const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    // หากเชื่อมต่ออยู่แล้ว ให้ใช้ Connection เดิม
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;