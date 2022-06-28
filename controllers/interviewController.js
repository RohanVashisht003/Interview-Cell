const Interview = require('../models/interview');
const Student = require('../models/student');
const Company = require('../models/company');
const Result = require('../models/result');

module.exports.renderPage = async (req, res) => {
    try {
        let interviews = await Interview.find({}).sort('-createdAt').populate('company');
        let students = await Student.find({}).sort({
            'name': 1
        });

        return res.render('interview', {
            title: 'Interviews',
            interviews: interviews,
            students: students
        });
    } catch (err) {
        req.flash('error',"Error in rendering page");
        console.log('Error', err);
        return;
    }

}

// create interview
module.exports.createInterview = async (req, res) => {
    try {
        let company = await Company.findOne({
            name: req.body.companyName,
        });

        if (!company) {
            Company.create({
                name: req.body.companyName,
                date: req.body.date
            }, (err, new_company) => {
                if (err) {
                    req.flash('error',"Company cannot be created");
                    console.log("cant create company", err);
                    return res.redirect("back");
                }
                Interview.create({
                    date: req.body.date,
                    company: new_company.id
                }, (err, new_interview) => {
                    if (err) {
                        req.flash('error',"Interview cannot be created");
                        console.log("cant create interview", err);
                        return res.redirect("back");
                    }
                    req.flash('success',"Interview created successfully");
                    console.log("Interview created", new_interview);
                    return res.redirect('back');
                });
            })
        } else {
            req.flash('information',"Interview already exist");
            console.log("Interview already exist");
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        console.log('Error', err);
        return;
    }
}

// allocate student
module.exports.addStudent = async (req, res) => {
    try {
        let company = await Company.findOne({
            name: req.body.companyName
        });
        if (company) {
            let interview = await Interview.findOne({
                company: company.id
            });

            let result = await Result.create({
                companyName: company.name,
                interviewDate: req.body.date,
                resultValue: req.body.result
            });

            let student = await Student.updateOne({
                id: req.body.student
            }, {
                $push: {
                    interviews: [{
                        company: interview.company,
                        result: result,
                        interview: interview
                    }]
                }
            });

            Interview.updateOne({
                company: company.id
            }, {
                $push: {
                    students: [{
                        student: req.body.student,
                        result: result
                    }]
                }
            }, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            req.flash('success',"Student assigned successfully");
            return res.redirect('back');
        } else {
            req.flash('error',"Interview not found");
            console.log("interview not found");
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

// see student list
module.exports.seeStudentList = async (req, res) => {
    try {
        // console.log("interview id", req.params.id);
        let interview = await Interview.findById(req.params.id).populate({
            path: 'students',
            populate: {
                path: 'student',
            },
        }).populate({
            path: 'students',
            populate: {
                path: 'result'
            }
        }).populate('company');

        return res.render('studentInterviewList', {
            title: 'List of Students',
            interviews: interview
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

// setResult
module.exports.setResult = (req, res) => {
    if (req.body.result !== undefined) {
        let result = Result.findByIdAndUpdate(req.params.id, {
            resultValue: req.body.result
        }, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        req.flash('success',"Result updated successfully");
        console.log('result updated', result._update);
        return res.redirect('back');

    } else {
        return res.redirect('back')
    }
}

// render interview update page
module.exports.updatePage = async (req,res)=>{
    let interview = await Interview.findOne({id:req.params.id}).populate('company');
        return res.render('updateInterview',{
            title:"Update Interview",
            interview:interview 
        });
}

module.exports.update = async(req, res)=>{
    let interview = await Interview.findById(req.params.id);
    let company = await Company.findById(interview.company);
    if(req.body.date === ''){
        company.name=req.body.companyName
    }
    else if(req.body.companyName=== ''){
        interview.date = req.body.date; 
    }
    else if(req.body.companyName === '' && req.body.date ===''){
        return;
    }
    else{
        interview.date = req.body.date;
        company.date=req.body.date;
    }
    interview.save();
    company.save();
    req.flash('success',"Interview details updated successfully");
    return res.redirect('/interview/form');
}