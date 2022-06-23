const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/studentController');

// render student page
router.get('/form',studentController.renderPage);
// create student
router.post('/create',passport.checkAuthentication,studentController.create);
// delete a student
router.get('/delete/:id',passport.checkAuthentication,studentController.delete);
// render student updation page
router.get('/student-profile/:id',passport.checkAuthentication,studentController.studentProfile);
router.post('/update/:id',passport.checkAuthentication,studentController.update);



module.exports= router;