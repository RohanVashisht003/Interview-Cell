const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// home page
router.get('/',homeController.home);

router.use('/employee',require('./employee'));
router.use('/student',require('./student'));
router.use('/interview',require('./interview'));
router.use('/csv',require('./csv'));


module.exports = router;
