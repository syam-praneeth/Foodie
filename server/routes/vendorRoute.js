const express = require('express');
const router = express.Router();
const vendorController = require('../Controllers/vendorController');

router.post('/register', vendorController.vendorController);     
router.post('/login', vendorController.vendorLogin);
module.exports = router;