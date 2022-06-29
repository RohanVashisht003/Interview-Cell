const mongoose = require('mongoose');

// comapny schema
const CompanySchema = new mongoose.Schema({
    name:{
        type:String
    },
    date:{
        type:Date
    },
   
});

const Company = mongoose.model('Company',CompanySchema);
module.exports = Company;