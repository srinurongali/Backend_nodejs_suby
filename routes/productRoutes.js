const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add-product/:firmId', productController.addproduct);

module.exports = router; // Correct: Exporting the router instance
