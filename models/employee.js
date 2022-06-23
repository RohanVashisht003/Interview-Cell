const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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

EmployeeSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

const Employee = mongoose.model('Employee',EmployeeSchema);
module.exports = Employee;