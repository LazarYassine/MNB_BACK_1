const db = require('../config/dbConfig');

const getAllProjectsByCompany = async (companyUUID) => {
    const sql = 'SELECT * FROM project WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

const getProjectById = async (projectId, companyUUID) => {
    const sql = 'SELECT * FROM project WHERE ProjectID = ? AND company_uuid = ?';
    return db.query(sql, [projectId, companyUUID]);
};

const createProject = async (projectData) => {
    const { companyUUID, Name, Description, VideoURL, ImageURL } = projectData;
    const insertQuery = `
        INSERT INTO project (company_uuid, Name, Description, VideoURL, ImageURL)
        VALUES (?, ?, ?, ?, ?)
    `;
    try {
        const result = await db.query(insertQuery, [companyUUID, Name, Description, VideoURL, ImageURL]);
        return result.insertId;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

const updateProject = async (projectId, companyUUID, projectData) => {
    const { Name, Description, VideoURL, ImageURL } = projectData;
    const sql = `
        UPDATE project 
        SET Name = ?, Description = ?, VideoURL = ?, ImageURL = ?
        WHERE ProjectID = ? AND company_uuid = ?
    `;
    return db.query(sql, [Name, Description, VideoURL, ImageURL, projectId, companyUUID]);
};

const deleteProject = async (projectId, companyUUID) => {
    const sql = 'DELETE FROM project WHERE ProjectID = ? AND company_uuid = ?';
    return db.query(sql, [projectId, companyUUID]);
};

const deleteProjectByCompanyUUID = async (companyUUID) => {
    const sql = 'DELETE FROM project WHERE company_uuid = ?';
    return db.query(sql, [companyUUID]);
};

module.exports = {
    getAllProjectsByCompany,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    deleteProjectByCompanyUUID
};
