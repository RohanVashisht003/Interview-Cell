const mongoose = require('mongoose');

// interview schema
const InterviewSchema = new mongoose.Schema({
    date:{
        type:Date
    },
    students:[{
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Student'
        },
        result:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Result'
        }
    }],
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }

});

const Interview = mongoose.model('Interview',InterviewSchema);
module.exports = Interview;