const mongoose = require('mongoose');

// connect to atlas
  // #### -> use your credentials
mongoose.connect('####', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// accquire connection
const db = mongoose.connection;

// if error 
db.on('error', console.error.bind(console, 'error in connection to db'));

// if successfully connected
db.once('open', () => {
    console.log('Successfully connected to db');
});


module.exports = db;