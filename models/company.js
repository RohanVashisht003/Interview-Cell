const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name:{
        type:String
    },
    interview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Interview'
    }]
});

const Company = mongoose.model('Company',CompanySchema);
module.exports = Company;