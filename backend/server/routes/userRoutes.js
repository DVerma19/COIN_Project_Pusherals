const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Save polygon data and user crop selection
router.post('/savePolygon', userController.savePolygon);

// Fetch user polygon data
router.get('/getPolygons/:userId', userController.getPolygons);

module.exports = router;
