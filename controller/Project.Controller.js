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
    }
}

module.exports = ProjectController;