const UserModel = require("../models/User.model");
const ProjectModel = require("../models/Project.model");
const TaskModel = require("../models/Task.model");

const TaskController = {
    create : async (req,res) =>{
        const {taskName , taskDescription , projectId , createdBy} = req.body;

        let checkIfUserExists,checkIfProjectExists;
        try {
            checkIfUserExists = await UserModel.findOne({_id:createdBy});
            checkIfProjectExists = await ProjectModel.findOne({_id:projectId});
        } catch (error) {
            return res.status(400).send("Bad input");
        }

        if(!checkIfProjectExists || !checkIfUserExists){
            return res.status(400).send("User or Project Does not exists");
        }

        var task = new TaskModel({
            taskName,
            taskDescription,
            createdBy,
            projectId,
        });

        let isTaskSaved = await task.save();
        if(!isTaskSaved){
            return res.status(500).send("Internal server error , Task not saved...");
        }
        return res.status(200).send("Task created successfully");

    },

    getTaskById: async(req,res)=>{
        const { taskId } = req.params;
        let checkIfTaskExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({_id:taskId});
        } catch (error) {
            return res.status(400).send("Task does not exits...");
        }
        if(!checkIfTaskExists){
            return res.status(400).send("Task does not exits...");
        }

        return res.status(200).json({
            status : true,
            task : checkIfTaskExists,
        });
    },

    getTaskByProjectId : async(req,res)=>{
        const { projectId } = req.params;
        let checkIfProjectExists;
        try {
            checkIfProjectExists = await ProjectModel.findOne({_id:projectId});
        } catch (error) {
            return res.status(400).send("Project does not exits...");
        }

        if(!checkIfProjectExists){
            return res.status(400).send("Task does not exits...");
        }

        let tasks = await TaskModel.find({projectId:projectId});
        tasks = tasks.map((task) => task._id);

        return res.status(200).send(tasks);
    },

    updateTaskById: async(req,res)=>{
        const { taskId } = req.params;
        const { taskName , taskDescription , taskDeadline , assignedTo , status} = req.body;
        let checkIfTaskExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({_id:taskId});
        } catch (error) {
            return res.status(400).send("Task does not exits.");
        }
        if(!checkIfTaskExists){
            return res.status(400).send("Task does not exits.");
        }

        let updateTask = await TaskModel.updateOne(
            { _id:taskId },
            {
                taskName,
                taskDescription,
                taskDeadline,
                assignedTo,
                status,
                updatedAt:new Date(),
            }
        );
        if(!updateTask){
            return res.status(500).send("Internal server error , task not updated..");
        }

        return res.status(200).send("Task updated successfully");
    },
}

module.exports = TaskController;