// This file defines the routes for the Express application, mapping HTTP requests to controller functions.

const express = require('express');
const router = express.Router();

// Import controller functions
const { getWorkshops, createWorkshop, updateWorkshop, deleteWorkshop } = require('../controllers');

// Define routes
router.get('/workshops', getWorkshops);
router.post('/workshops', createWorkshop);
router.put('/workshops/:id', updateWorkshop);
router.delete('/workshops/:id', deleteWorkshop);

module.exports = router;