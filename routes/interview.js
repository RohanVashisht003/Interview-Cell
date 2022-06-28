const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/studentController');
const interviewController = require('../controllers/interviewController');

// rendering interview main page
router.get('/form',passport.checkAuthentication,interviewController.renderPage);

// creating interview
router.post('/create-interview',passport.checkAuthentication,interviewController.createInterview);

// assigning student to interview
router.post('/add-student',passport.checkAuthentication,interviewController.addStudent);

// see students list in interview
router.get('/see-list/:id',passport.checkAuthentication,interviewController.seeStudentList);

// set result of interview for a student
router.post('/result/:id',passport.checkAuthentication,interviewController.setResult);

//update interview details
router.get('/update-page/:id',passport.checkAuthentication,interviewController.updatePage);
router.post('/update/:id',passport.checkAuthentication,interviewController.update);



module.exports = router;