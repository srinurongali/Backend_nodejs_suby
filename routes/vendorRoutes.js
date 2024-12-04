const vendorController = require('../controllers/vendorController');
const express = require('express');

const router = express.Router();

router.post('/register', vendorController.VendorRegister);
router.post('/login',vendorController.VenderLogin);
router.get('/getAllVendors',vendorController.getAllVendors)
router.get('/getVendorById/:id',vendorController.getVendorById);

module.exports = router;
