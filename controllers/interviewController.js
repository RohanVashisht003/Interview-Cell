const Interview = require('../models/interview');
const Student = require('../models/student');
const Company = require('../models/company');


module.exports.renderPage = async (req, res) => {
    try {
        let interviews = await Interview.find({}).sort('-createdAt').populate('company');
        console.log('interviews', interviews);
        let students = await Student.find({}).sort({'name':1});

        return res.render('interview', {
            title: 'Interviews',
            interviews: interviews,
            students:students
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }

}

// create interview
module.exports.createInterview = async (req, res) => {
    try {
        await Company.create({
            name: req.body.companyName
        }, (err, company) => {
            if(err){
                console.log("error ",err);
            }
            // console.log("Company", company);
            Interview.create({
                date: req.body.date,
                company: company.id
            }, (err, interview) => {
                if (err) {
                    console.log("err", err)
                }
                console.log("interview created", interview);
            });

            return res.redirect('/interview/form');
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

// allocate student
module.exports.addStudent = (req,res)=>{
    try{
        console.log(req.body.student);
        Interview.find({date:req.body.date},(err,interview)=>{
            if(err){
                console.log("err",err);
                return;
            }
            if(interview){
                interview.student.push(req.body.student);
                
                console.log("Student allocated");
                return;
            }
            console.log("First create an interview");
            return;
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}

// see student list
module.exports.seeStudentList = async (req, res) => {
    try {
        console.log("company id", req.params.id);
        let company = await Company.findById(req.params.id).populate({
            path: 'interview',
            populate: {
                path: 'student'
            }
        });
        console.log("company", company);
        return res.render('studentInterviewList', {
            title: 'List of Students',
            company: company.interview
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}