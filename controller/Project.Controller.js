const ProjectModel = require("../models/Project.model");
var Project = require("../models/Project.model");
var UserModel = require("../models/User.model");


const ProjectController = {
    create: async (req, res) => {
        var { projectName, projectDescription, createdBy } = req.body;
        // check
        let checkIfUserExists;
        try {
            checkIfUserExists = await UserModel.findOne({ _id: createdBy });
            if (!checkIfUserExists) {
                return res.status(400).send("User does not exists ... ");
            }
        } catch (error) {
            return res.status(500).send("Internal error.. ");
        }

        var project = new Project({
            projectName,
            projectDescription,
            createdBy
        });

        let ifProjectSaved = await project.save();
        if (!ifProjectSaved) {
            // server error
            return res.status(500).send("Project not saved something went wrong");
        }

        return res.status(200).send("Project created successfully");

    },

    getALlProject: async (req, res) => {
        let allProjects = await Project.find({ isDeleted: false });
        if (!allProjects) {
            return res.status(500).send("Something went wrong");
        }
        return res.status(200).send(allProjects);
    },

    getProjectById: async (req, res) => {
        let { projectId } = req.params;
        let project;
        try {
            project = await Project.findOne({ _id: projectId, isDeleted: false });
        } catch (error) {
            return res.status(404).send("Project not Found ..");
        }
        if (!project) {
            return res.status(404).send("Project not Found ..");
        }
        return res.status(200).send(project);
    },

    getProjectByUserId: async (req, res) => {
        let { userId } = req.params;
        let project;
        try {
            project = await Project.findOne({ projectMembers: userId, isDeleted: false });  //try catch 
        } catch (error) {
            return res.status(404).send("project not found");
        }

        if (!project) {
            return res.status(404).send("project not found");
        }
        return res.status(200).send(project);
    },

    assignProjectToUser: async (req, res) => {
        var { projectId, userId } = req.body;
        let checkIfUserExists;
        let checkIfProjectExists;
        try {
            checkIfUserExists = await UserModel.findOne({ _id: userId });
            checkIfProjectExists = await Project.findOne({ _id: projectId });
        }
        catch (error) {
            return res.status(404).send("User or project does not exits");
        }

        console.log("user member : ", checkIfProjectExists.projectMembers.includes(userId));
        if (checkIfProjectExists.projectMembers.includes(userId)) {
            // conflict 
            return res.status(409).send("User already assigned to this project");
        }

        checkIfProjectExists.projectMembers.push(userId);
        checkIfUserExists.projects.push(projectId);

        let ifProjectSaved = await checkIfProjectExists.save();
        let ifUserSaved = await checkIfUserExists.save();

        if (!ifProjectSaved || !ifUserSaved) {
            return res.status(500).send("Something went wrong");
        }
        return res.status(200).send("project assign successfully");
    },

    updateProjectById: async (req, res) => {
        var { projectId } = req.params;
        var { projectName, projectDescription , isDeleted, isCompleted } = req.body;
    
        let checkIfProjectExists;
        try {
            checkIfProjectExists = await ProjectModel.findOne({_id : projectId});
        } catch (error) {
            return res.status(400).send("bad request ...");
        }

        if(!checkIfProjectExists){
            return res.status(400).send("Project does not exists...");
        }

        // console.log("token : ",req.user);
        let updateProject = await ProjectModel.updateOne(
            { _id:projectId },
            {
                projectName,
                projectDescription,
                isCompleted,
                isDeleted,
                updatedAt:new Date(),
                updatedBy: req.user._id
            }
        );

        if(!updateProject){
            return res.status(500).send("Internal server error , project not updated..");
        }

        return res.status(200).send("Project updated successfully");
    },

    deleteProjectById: async (req, res) => {
        const { projectId } = req.params;
        let checkIfProjectExists;
        try {
            checkIfProjectExists = await ProjectModel({ _id: projectId });
        } catch (error) {
            return res.status(400).send("Bad input...");
        }

        if (!checkIfProjectExists) {
            return res.status(400).send("Project does not exits...");
        }

        const result = await ProjectModel.deleteOne({ _id : projectId });
        if (result.deletedCount === 1) {
            return res.status(200).json({
                status: true,
                message : "Deleted successfully",
            });
        }
        return res.status(500).json({
            status: false,
            error: 'internal server error ,  member not deleted.',
        });
    }
}

module.exports = ProjectController;