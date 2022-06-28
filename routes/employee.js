const express = require('express');
const passport = require('passport');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// sign in
router.get('/sign-in', employeeController.signIn);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/employee/sign-in'
}), employeeController.createSession);


// sign up
router.get('/sign-up', employeeController.signUp);
router.post('/create', employeeController.create);


// sign out
router.get('/sign-out', employeeController.destroySession);

// update password for employee
router.get('/update-password-form', passport.checkAuthentication, employeeController.updatePasswordForm);
router.post('/update-password', passport.checkAuthentication, employeeController.updatePassword);


module.exports = router;