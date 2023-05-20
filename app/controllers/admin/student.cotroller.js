const StudentsInfo = require('../../models/admin/students'),
    bcrypt = require('bcryptjs');
// --------------------Students-----------------------------

//show students
function showStu_info(req, res) {
    StudentsInfo.find({})
        .then((student) => {
            res.render('adminPages/studentInfo/students.ejs', { student, layout: 'layouts/layout.ejs' })
        })
        .catch((err) => console.log(err.message));
}
// create student account
function createStu(req, res) {
    res.render('adminPages/studentInfo/createStu.ejs', { layout: 'layouts/layout.ejs' })
}
//store student in database
async function storeStu(req, res) {
    // get last code in students database
    var code
    await StudentsInfo.find({}).sort("Stu_code")
        .then((student) => {
            // console.log(student[student.length - 1].Stu_code)
            if (student.length != 0) {
                code = student[student.length - 1].Stu_code + 1
            } else {
                code = 100
            }
        })

    // get password from form and encrypt it
    const password = req.body.Stu_password;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    //take data from form
    const student = StudentsInfo({
        Stu_name: req.body.Stu_name,
        Stu_password: hashPassword,
        Stu_code: code,
        Stu_email: req.body.Stu_name + "." + code + "@gmail.com"
    });
    // console.log(student.Stu_password)

    StudentsInfo.find({ Stu_code: student.Stu_code })
        .then((data) => {
            if (data.length == 0) {
                //save data in database
                student.save()
                    .then(student => {
                        console.log(student)
                        res.redirect('/admin/showStuInfo')
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.redirect('/admin/createStu')
                    })
            } else {
                console.log('Student exist');
                res.redirect('/admin/showStuInfo')
            }
        })
        .catch(err => console.log(err.message));
}

//update student
function editStuInfo(req, res) {
    const id = req.params.id;
    StudentsInfo.findById(id)
        .then((student) => {
            res.render('adminPages/studentInfo/editStuInfo.ejs', { student, layout: 'layouts/layout.ejs' })
        })
        .catch((err) => console.log(err.message))
}

function updateStuInfo(req, res) {
    const id = req.params.id;

    // get password from form and encrypt it
    const password = req.body.Stu_password;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    StudentsInfo.findById(id)
        .then((student) => {
            student.Stu_name = req.body.Stu_name
            student.Stu_password = hashPassword
            // console.log(hashPassword);

            student.save();
            res.redirect('/admin/showStuInfo')
        })
        .catch(err => console.log(err.message))
}

//delete student
function deleteStuInfo(req, res) {
    const id = req.params.id;
    StudentsInfo.findById(id)
        .then((student) => {
            student.deleteOne({ _id: id })
            res.redirect('/admin/showStuInfo')
        })
        .catch(err => console.log(err.message))
}

module.exports = {
    showStu_info,
    createStu,
    storeStu,
    editStuInfo,
    updateStuInfo,
    deleteStuInfo
}