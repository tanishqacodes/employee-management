const UserModel = require("../models/User.model");
const ProjectModel = require("../models/Project.model");
const TaskModel = require("../models/Task.model");

const TaskController = {
    create: async (req, res) => {
        const { taskName, taskDescription, projectId} = req.body;

        let checkIfUserExists, checkIfProjectExists;
        try {
            checkIfUserExists = await UserModel.findOne({ _id: req.user.id });
            checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
        } catch (error) {
            return res.status(400).send("Bad input");
        }

        if (!checkIfProjectExists || !checkIfUserExists) {
            return res.status(400).send("User or Project Does not exists");
        }

        var task = new TaskModel({
            taskName,
            taskDescription,
            createdBy : req.user.id,
            projectId,
        });

        let isTaskSaved = await task.save();
        if (!isTaskSaved) {
            return res.status(500).send("Internal server error , Task not saved...");
        }
        return res.status(200).send("Task created successfully");

    },

    getTaskById: async (req, res) => {
        const { taskId } = req.params;
        let checkIfTaskExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({ _id: taskId });
        } catch (error) {
            return res.status(400).send("Task does not exists...");
        }
        if (!checkIfTaskExists) {
            return res.status(400).send("Task does not exists...");
        }

        return res.status(200).json({
            status: true,
            task: checkIfTaskExists,
        });
    },

    getTaskByProjectId: async (req, res) => {
        const { projectId } = req.params;
        let checkIfProjectExists;
        try {
            checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
        } catch (error) {
            return res.status(400).send("Project does not exists...");
        }

        if (!checkIfProjectExists) {
            return res.status(400).send("Task does not exists...");
        }

        let tasks = await TaskModel.find({ projectId: projectId });
        tasks = tasks.map((task) => task._id);

        return res.status(200).send(tasks);
    },

    updateTaskById: async (req, res) => {
        const { taskId } = req.params;
        const { taskName, taskDescription, taskDeadline, assignedTo, status } = req.body;
        let checkIfTaskExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({ _id: taskId });
        } catch (error) {
            return res.status(400).send("Task does not exits.");
        }
        if (!checkIfTaskExists) {
            return res.status(400).send("Task does not exits.");
        }

        let updateTask = await TaskModel.updateOne(
            { _id: taskId },
            {
                taskName,
                taskDescription,
                taskDeadline,
                assignedTo,
                status,
                updatedAt: new Date(),
                updatedBy : req.user.id,
            }
        );
        if (!updateTask) {
            return res.status(500).send("Internal server error , task not updated..");
        }

        return res.status(200).send("Task updated successfully");
    },

    deleteTaskById: async (req, res) => {
        const { taskId } = req.params;
        let checkIfTaskExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({ _id: taskId });
        } catch (error) {
            return res.status(400).send("provide valid input ....");
        }

        if (!checkIfTaskExists) {
            return res.status(400).send("Task does not exists ...");
        }

        checkIfTaskExists.isDeleted = true;
        return res.status(200).json({
            status: true,
        });
    },

    assignTask : async (req,res)=>{
        var { taskId , userId } = req.body;
        let checkIfTaskExists, checkIfUserExists;
        try {
            checkIfTaskExists = await TaskModel.findOne({ _id : taskId , isDeleted : false});
            checkIfUserExists = await UserModel.findOne({ _id : userId , isDeleted : false});
        } catch (error) {
            return res.status(400).send("bad input...");
        }

        if(!checkIfTaskExists){
            return res.status(400).send("Task does not exists ...");
        }
        if(!checkIfUserExists){
            return res.status(400).send("User does not exists ...");
        }

        console.log("task assigned to : ", checkIfTaskExists.assignedTo.includes(userId));
        if (checkIfTaskExists.assignedTo.includes(userId)) {
            // conflict 
            return res.status(409).send("User already assigned to this task");
        }

        // assign task
        checkIfTaskExists.assignedTo.push(userId);
        
        checkIfTaskExists.updatedAt = new Date();
        checkIfTaskExists.updatedBy = req.user.id;

        checkIfUserExists.tasks.push(taskId);

        let ifTaskSaved = await checkIfTaskExists.save();
        let ifUserSaved = await checkIfUserExists.save();


        if (!ifTaskSaved || !ifUserSaved) {
            return res.status(500).send("Something went wrong");
        }
        return res.status(200).send("task assigned successfully");
        
    }
}

module.exports = TaskController;