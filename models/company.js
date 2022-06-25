const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name:{
        type:String
    },
    student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }]
});

const Company = mongoose.model('Company',CompanySchema);
module.exports = Company;