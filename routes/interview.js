const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/studentController');
const interviewController = require('../controllers/interviewController');

router.get('/form',interviewController.renderPage);
router.post('/create-interview',interviewController.createInterview);
router.post('/add-student',interviewController.addStudent);
router.get('/see-list/:id',interviewController.seeStudentList);



module.exports = router;