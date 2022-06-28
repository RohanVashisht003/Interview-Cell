const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    
    companyName:{
        type:String,
    },
    resultValue:{
        type:String,
        enum:['PASS','FAIL','On Hold','Did not attempted'],
        default:'Did not attempted'
    },
    interviewDate:{
        type:Date
    }
});

const Result = mongoose.model('Result',ResultSchema);
module.exports = Result;