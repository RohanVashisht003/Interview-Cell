const Student =  require('../models/student');
const Interview = require('../models/interview');

// render student page
module.exports.renderPage = async(req, res)=>{
    try{
        // find and sort students
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
        req.flash('success','Student created successfully');
        console.log("student created successfully",student);
        return res.redirect('/student/form');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


// render student update page
 module.exports.studentProfile =(req, res)=>{
    // find student
        Student.findById(req.params.id,(err,student)=>{
            return res.render('updatePage',{
            title:'Update Student',
            student:student
        })
        });  
}

module.exports.update = async(req, res)=>{
    try{
        // find student
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
            req.flash('success','Student details updated successfully')
            console.log("Student details updated successfully");
            return res.redirect('/student/form');
        }
        else{
            req.flash('error','Studen not found');
            console.log("Studnet not found");
        }   
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
