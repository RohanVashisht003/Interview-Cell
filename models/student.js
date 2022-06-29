const mongoose = require('mongoose');

// student schema
const StudentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
  },
  batch: {
    type: String,
  },
  college: {
    type: String
  },
  status: {
    type: String,
    enum: ['Placed', 'Not Placed'],
  },
  result: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  }],
  webDev: {
    name: {
      type: String,
      default: 'Web Development'
    },
    score: {
      type: Number,
      default: 0
    }
  },
  react: {
    name: {
      type: String,
      default: 'React Course'
    },
    score: {
      type: Number,
      default: 0
    }
  },
  dsa: {
    name: {
      type: String,
      default: 'Data Structure And Algo'
    },
    score: {
      type: Number,
      default: 0
    }
  },
  interviews: [{
    company:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Company'
    },
    result:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Result'
    },
    interview:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Interview'
    }
  }],

}, {
  timestamps: true
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;