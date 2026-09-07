const Task = require("../models/Task");

// @desc    ดึงข้อมูล Task (สามารถกรองตาม Project ได้)
// @route   GET /api/tasks?projectId=xxx

exports.getTasks = async (req,res) => {
    try {
        const {projectId} = req.query;
        const filter = {user: req.user.id};


        if (projectId) {
            filter.project = projectId;
        }
        // const tasks = await Task.findOne({ user: req.user.id}); // For seem ths task by id
        // const tasks = await Task.find(); // For seem the task all 
        const tasks = await Task.find(filter).populate("project","title");
        res.status(200).json(tasks);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

// @desc    สร้าง Task ใหม่ภายใต้ Project
// @route   POST /api/tasks
exports.createTask = async (req,res) => {
    try {
        const { title, description,projectId } = req.body;

        if(!title || !projectId) {
            return res.status(400).json({ message : "กรุณากรอกหัวข้อ Taskและเลือก Project"});
        }

        const task = await Task.create({
            title,
            description,
            project:projectId,
            user:req.user.id, // ผูก ID ของเจ้าของ Task จาก Token
        });

        res.status(201).json(task);
    } catch (error){
        return res.status(500).json({ message : error.message});
    }
};

// @desc    แก้ไข Task (เช่น เปลี่ยนสถานะ completed หรือแก้ข้อความ)
// @route   PUT /api/tasks/:id
exports.updateTask = async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({ message : "Not found this Task"});
        }

        // chech own task ?
        if (task.user.toString() !== req.user.id){
            return res.status(401).json({ message : "Not to update this task"});
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true} // ให้คืนค่าข้อมูลหลังอัปเดตกลับมา
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
};

// @desc    ลบ Task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({ message : "Not found this Task"});
        }

        // chech own task ?
        if (task.user.toString() !== req.user.id){
            return res.status(401).json({ message : "Not to delete this task"});
        }

        await task.deleteOne();
        res.status(200).json({message:"Deleted this task"});
    } catch (error){
        return res.status(500).json({ message: error.message });
    }
}