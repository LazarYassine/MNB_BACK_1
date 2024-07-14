const projectModel = require('../models/projectModel');

const getAllProjectsByCompany = async (req, res) => {
    const { companyUUID } = req.params;
    try {
        const projects = await projectModel.getAllProjectsByCompany(companyUUID);
        res.status(200).json(projects[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

const getProjectById = async (req, res) => {
    const { companyUUID, projectId } = req.params;
    try {
        const project = await projectModel.getProjectById(projectId, companyUUID);
        if (project.length === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.status(200).json(project[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

const createProject = async (req, res) => {
    const { companyUUID } = req.params;
    const projectData = req.body;
    try {
        await projectModel.createProject({ ...projectData, companyUUID: companyUUID });
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

const updateProject = async (req, res) => {
    const { companyUUID, projectId } = req.params;
    const projectData = req.body;
    try {
        await projectModel.updateProject(projectId, companyUUID, projectData);
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update project' });
    }
};

const deleteProject = async (req, res) => {
    const { companyUUID, projectId } = req.params;
    try {
        await projectModel.deleteProject(projectId, companyUUID);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
};

module.exports = {
    getAllProjectsByCompany,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
