const servicesModel = require('../models/servicesModel');

const createService = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const serviceData = req.body;
    try {
        await servicesModel.createService(companyUUID, serviceData);
        res.status(201).json({ message: 'Service created successfully' });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
};

const getAllServices = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    try {
        const services = await servicesModel.getAllServices(companyUUID);
        res.status(200).json(services[0]);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
};

const getServiceByUUID = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const serviceId = req.params.serviceId;
    try {
        const service = await servicesModel.getServiceByUUID(companyUUID, serviceId);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching service by ID:', error);
        res.status(500).json({ error: 'Failed to fetch service by ID' });
    }
};

const updateService = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const serviceId = req.params.serviceId;
    const serviceData = req.body;
    try {
        await servicesModel.updateService(companyUUID, serviceId, serviceData);
        res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'Failed to update service' });
    }
};

const deleteService = async (req, res) => {
    const companyUUID = req.params.companyUUID;
    const serviceId = req.params.serviceId;
    try {
        await servicesModel.deleteService(companyUUID, serviceId);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceByUUID,
    updateService,
    deleteService
};
