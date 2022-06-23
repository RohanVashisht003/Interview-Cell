const Student =  require('../models/student');

module.exports.renderPage = async(req, res)=>{
    try{
        let students = await Student.find({})
        .sort('-createdAt');

        return res.render('student',{
            title:'Student',
            students:students
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
   
}

// create student
module.exports.create = async(req,res)=>{
    try{
       let student = await Student.create({
        name:req.body.name,
        email:req.body.email,
        batch:req.body.batch,
        college:req.body.college,
        status:req.body.status,
        webDev:{score:req.body.webDevScore},
        react:{score:req.body.reactScore},
        dsa:{score:req.body.dsaScore}
        });
        console.log("student created successfully",student);
        return res.redirect('/student/form');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// delete student
module.exports.delete = async(req,res)=>{
    try{
        let student = await Student.findByIdAndDelete(req.params.id);
        console.log("student",student);
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// render student update page
 module.exports.studentProfile =(req, res)=>{
        Student.findById(req.params.id,(err,student)=>{
            console.log("student",student);
            return res.render('updatePage',{
            title:'Update Student',
            student:student
        })
        });  
}

module.exports.update = async(req, res)=>{
    try{
        let student = await Student.findById(req.params.id);
        if(student){
            student.name=req.body.name,
            student.batch=req.body.batch,
            student.college=req.body.college,
            student.status=req.body.status,
            student.webDev={score:req.body.webDevScore},
            student.react={score:req.body.reactScore},
            student.dsa={score:req.body.dsaScore}

            student.save();
            console.log("Student details updated successfully");
            return res.redirect('/student/form');
        }
        else{
            console.log("Studnet not found");
        }   
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
