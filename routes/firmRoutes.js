const express=require('express');
const firmController=require('../controllers/firmController');
const verifyToken=require('../middelewares/verifyToken');

const router= express.Router()

router.post('/add-firm', verifyToken,firmController.addFirm);

module.exports=router;