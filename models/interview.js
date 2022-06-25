const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    date:{
        type:Date
    },
    student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }

});

const Interview = mongoose.model('Interview',InterviewSchema);
module.exports = Interview;