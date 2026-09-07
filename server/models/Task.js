const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: [true,"กรุณากรอกหัวข้อ Task"],
            trim: true,
        },
        description:{
            type:String,
            tirm:true,
        },
        completed:{
            type:Boolean,
            default:false,// ค่าเริ่มต้นคือยังทำไม่เสร็จ
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", // อ้างอิงไปยัง User Model
            required:true,// ระบุว่า Task ต้องมีเจ้าของเสมอ
        },
        project:{
            type:mongoose.Schema.ObjectId,
            ref:"Project",
            required:[true,"Task ต้องสังกัดอยู่ใน Project"]
        },

    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Task",taskSchema);