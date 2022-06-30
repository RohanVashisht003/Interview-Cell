const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: "email",
        passReqToCallback: true,
    },
    (req, email, password, done) => {

        // find a user and establish identity
        Employee.findOne({
            email: email
        }, (err, user) => {
            if (err) {
                console.log('err', err);
                return done(err);
            }
            if (!user) {
                req.flash('information', 'Employee not registered')
                console.log('Employee not registered');
                return done(null, false);
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result == true) {
                    return done(null, user);
                } else {
                    req.flash('error', 'Invalid email/password')
                    console.log('error', 'Invalid email/password');
                    return done(null, false);
                }
            })
        })
    }
));

// serializing the user to decide which key to kept in cookies
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// deserializing the user from key in the cookies
passport.deserializeUser((id, done) => {
    Employee.findById(id, (err, user) => {
        if (err) {
            console.log(err, "error in findind user -->passport");
            return done(err);
        }
        return done(null, user);
    });
});

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        // req.user contains the current sign-in user from session cookie and we are storing it into locals for views
        res.locals.user = req.user;
    }
    next();
}

// check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/employee/sign-in');
}


module.exports = passport;