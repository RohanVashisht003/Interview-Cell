const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    score:{
        type:Number
    },
    student:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }
});

const Course = mongoose.model('Course',CourseSchema);
mongoose.exports = Course;