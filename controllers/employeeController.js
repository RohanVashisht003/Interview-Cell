const Employee = require('../models/employee');
const bcrypt = require('bcrypt');

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signIn', {
        title: 'Sign In'
    })
}

module.exports.signUp = (req, res) => {
    return res.render('signUp', {
        title: 'Sign Up'
    })
}

module.exports.create = (req, res) => {
    try {
        console.log("my-body", req.body);
        if (req.body.password !== req.body.confirmPassword) {
            console.log('confirm password and password should be same');
            return res.redirect('back');
        }
        Employee.findOne({
            email: req.body.email
        }, (err, employee) => {
            if (err) {
                console.log(err, "Error in singing Up employee");
                return;
            }
            if (employee) {
                console.log('Employee already exist');
                return res.redirect('back');
            }
            if (!employee) {
                Employee.create(req.body, (err, employee) => {
                    if (err) {
                        console.log(err, "Error in singing Up employee");
                        return;
                    }
                    console.log('Employee created successfully', employee);
                    return res.redirect('/employee/sign-in');
                })
            }
        })
    } catch (err) {
        console.log(err, 'error in creating employee try again');
        return res.redirect('back');
    }
}

module.exports.createSession = (req, res) => {
    console.log("Employee logged in");
    return res.redirect('/');
}

// logout user
module.exports.destroySession = (req, res) => {
    req.logout(req.user, (err) => {
        if (err) {
            return next(err);
        }
        // req.flash('success','User logged out');
        console.log("User logged out")
        return res.redirect('/');
    });
}

module.exports.updatePasswordForm = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('updatePasswordForm', {
            title: 'Update Password'
        });
    }
    return res.redirect('/');
}

module.exports.updatePassword = (req, res) => {
    let loggedInUser = req.user;
    if (req.body.newPassword !== req.body.confirmPassword) {
        req.flash('error', 'Password and confirm password not matched');
        console.log('Password and confirm password not matched');
        return res.redirect('back');
    }

    bcrypt.compare(req.body.oldPassword, loggedInUser.password, (err, result) => {
        if (result == true) {
            loggedInUser.password = req.body.newPassword;
            loggedInUser.save();
            // updatePasswordMailer.sendPasswordUpdateMail(loggedInUser);
            // let job = queue.create('updatePassword_mails', {
            //     user:loggedInUser
            //      }).save(function(err){
            //      if(err){
            //          console.log(err, 'error in creating queue');
            //          return;
            //      }
            //      console.log('job enqueued',job.id);
            //  });
            // req.flash('success','Password updated successfully');
            console.log("Password updated successfully")
            return res.redirect('/');
        } else {
            // req.flash('error','Enter correct old password');
            console.log("old password is not correct");
            return res.redirect('back');
        }
    });
}