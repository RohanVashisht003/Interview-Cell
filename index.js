const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const flashMiddleWare = require('./config/flash-middleware');
const expressLayouts = require('express-ejs-layouts');

// using static files
app.use(express.static('./assets'));

// setting scripts and styles in layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);
app.use(express.urlencoded(
    {extended:true}
));
app.use(cookieParser());


// setting view engine
app.set('view engine','ejs');

// setting views
app.set('views','./views');

app.use(session({
    name:'placement-cell',
    secret:'blabla',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*3600000)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://rohan003:000@placement-cell.da4ryif.mongodb.net/?retryWrites=true&w=majority',
      },
      function (err) {
        console.log(err || "connect-mongo setup OK");
      }
      
    )
}));

app.use(flash());
app.use(flashMiddleWare.setFlash);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// using routes
app.use('/',require('./routes'));


// app listening to server
app.listen(port, (err)=>{
    if(err){
        console.log("Server error");
        return;
    }
    console.log("Server is running on port",port);
})