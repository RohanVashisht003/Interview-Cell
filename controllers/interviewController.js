const Interview = require('../models/interview');
const Student = require('../models/student');
const Company = require('../models/company');


module.exports.renderPage = async (req, res) => {
    try {
        let students = await Student.find({}).
        sort({
            name: 1
        });
        let interviews = await Interview.find({}).sort('-createdAt').populate('company');
        let companies = await Company.find({}).sort('-createdAt').populate({
            path:'interview',
            populate:{
                path:'student'
            }
        });
        return res.render('interview', {
            title: 'Interviews',
            students: students,
            interviews: interviews,
            companies:companies
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }

}

// create interview
module.exports.create = async (req, res) => {
    try {
        await Company.create({
            name: req.body.companyName
        }, (err, company) => {
            if (err) {
                console.log('err in creating company', err);
                return;
            }
            console.log("company id", company.id);
            Interview.create({
                company: company.id,
                student: req.body.student,
                date: req.body.date
            }, (err, interview) => {
                if (err) {
                    console.log('err in creating interview', err);
                    return;
                }
                company.interview.push(interview.id);
                company.save();
                console.log("successfully pushed into company's interview");
                Student.findById(req.body.student, (err, student) => {
                    if (err) {
                        console.log('err in finding student', err);
                        return;
                    }
                    student.interview.push(interview.id);
                    student.save();
                    console.log("successfully pushed into student's interview");
                })
                console.log("interview created successfully", interview);
                return res.redirect('back');
            });
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

// see student list
module.exports.seeStudentList = async (req, res) => {
    try {
        console.log("company id", req.params.id);
        let company = await Company.findById(req.params.id).populate({
            path:'interview',
            populate:{
                path:'student'
            }
        });
        console.log("company", company);
        return res.render('studentInterviewList', {
            title: 'List of Students',
            company:company.interview
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}