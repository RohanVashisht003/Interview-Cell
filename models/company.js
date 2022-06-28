const mongoose = require('mongoose');

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