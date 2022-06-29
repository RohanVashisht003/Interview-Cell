const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// employee schema
const EmployeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }
},{timestamps:true});

// before saving
EmployeeSchema.pre('save',async function(next){
    // if not modified
    if(!this.isModified('password')){
        return next();
    }
// else ecnrypt password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

const Employee = mongoose.model('Employee',EmployeeSchema);
module.exports = Employee;