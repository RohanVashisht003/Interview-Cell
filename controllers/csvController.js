const Student = require('../models/student');
const fs = require('fs');


// for downloadinng csv
module.exports.downloadCSV = async (req, res) => {
    if(req.isAuthenticated()){
        try {
            // find and storing student in variable
            const studentArray = await Student.find({}).populate({
                path: 'interviews',
                populate: {
                    path: 'interview'
                }
            }).populate({
                path: 'interviews',
                populate: {
                    path: 'company'
                }
            }).populate({
                path: 'interviews',
                populate: {
                    path: 'result'
                }
            });
            console.log("StudentArray", studentArray);
            entry: "";
            // cols for file
            var fileData = "Student Id, Student Name, Student College, Student Status, DSA Score, WebDev Score, React Score, Interview Date,Interview Company, Interview Result";
            // iterating over data
            for (student of studentArray) {
                entry1 = student.id +
                    "," +
                    student.name +
                    "," +
                    student.college +
                    "," +
                    student.status +
                    "," +
                    student.dsa.score +
                    "," +
                    student.webDev.score +
                    "," +
                    student.react.score;
    
                entry = entry1;
                if (student.interviews.length > 0) {
                    for (interview of student.interviews) {
                        entry2 =
                            "," +
                            interview.interview.date.toString() +
                            "," +
                            interview.company.name +
                            "," +
                            interview.result.resultValue;
                        entry += entry2;
                        fileData += '\n' + entry;
                        entry = entry1
                    }
                    entry = "";
                }
                console.log(entry)
                fileData += '\n' + entry;
    
            }
    
            const file = fs.writeFile('assets/csv/data.csv',
                fileData,
                (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("back");
                    }
                    console.log("File downloaded");
                    return res.download("assets/csv/data.csv");
    
                });
        } catch (err) {
            console.log(err);
        }
    }
}