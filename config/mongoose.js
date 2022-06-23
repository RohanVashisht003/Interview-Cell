const mongoose = require('mongoose');

// connect to atlas
mongoose.connect('mongodb+srv://rohan003:000@placement-cell.da4ryif.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})

// accquire connection
const db = mongoose.connection;

// if error 
db.on('error',console.error.bind(console,'error in connection to db'));

// if successfully connected
db.once('open',()=>{
    console.log('Successfully connected to db');
});


module.exports = db;