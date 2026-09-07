const Project = require("../models/Project");
const Task = require("../models/Task");

// Get All project of User
exports.getProject = async(req,res) => {
    try {
        const projects = await Project.find({user:req.user.id});
        res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

// Create new project

exports.createProject = async (req,res) => {
    try {
        const { title,description }= req.body;
        if(!title) return res.status(400).json({message:"กรุณากรอกชื่อโปรเจกต์"});

        const project = Project.create({
            title,
            description,
            user:req.user.id,
        });

        res.status(200).json(project);
    }catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// @desc    ลบ Project และ Tasks ทั้งหมดใน Project นั้น
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req,res) => {
    try {
        const project = await Project.findOne({_id:req.params.id,user:req.user.id});

        if(!project) {
            return res.status(400).json({message:"ไม่พบโปรเจกต์ หรือไม่มีสิทธิ์ลบ"})

        }

        // 1. ลบ Task ทั้งหมดที่ผูกกับ Project นี้
        await Task.deleteMany({project:req.params.id});

        // 2. ลบตัว Project
        await project.deleteOne();

        res.status(200).json({message:"ลบโปรเจกต์เรียบร้อยแล้ว"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};