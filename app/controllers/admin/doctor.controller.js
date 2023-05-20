const Doctors = require('../../models/admin/doctors.js'),
    Subjects = require('../../models/admin/subjects.js'),
    bcrypt = require('bcryptjs');
// --------------------Doctors-----------------------------

// show doctors
function showDoc_Info(req, res) {
    Doctors.find({})
        .then((doctor) => {
            res.render('adminPages/doctorInfo/doctors.ejs', { doctor, layout: 'layouts/layout.ejs' });
        })
        .catch((err) => console.log(err.message))
}

// create doctor account
function createDoc(req, res) {
    Subjects.find({})
        .then((subject) => {
            res.render('adminPages/doctorInfo/createDoc.ejs', { subject, layout: 'layouts/layout.ejs' });
        })
        .catch((err) => console.log(err.message))
}
// store doctor in database
async function storeDoc(req, res) {
    // get last code in doctors database
    var code
    await Doctors.find({}).sort("Doc_code")
        .then((doctor) => {
            if (doctor.length != 0) {
                code = doctor[doctor.length - 1].Doc_code + 1
            } else {
                code = 1000
            }
        })

    // get password from form and encrypt it
    const password = req.body.Doc_password;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // console.log(hashPassword);

    //take data from form
    const doctor = Doctors({
        Doc_name: req.body.Doc_name,
        Doc_code: code,
        Doc_password: hashPassword,
        Doc_email: req.body.Doc_name + "." + code + "@gmail.com",
        SUB_name: req.body.SUB_name
    });

    Doctors.find({ $or: [{ Doc_name: doctor.Doc_name }, { Doc_code: doctor.Doc_code }] })
        .then((data) => {
            if (data.length == 0) {
                // save data in database
                doctor.save()
                    .then((doctor) => {
                        console.log(doctor)
                        res.redirect('/admin/showDocInfo')
                    })
                    .catch((err) => {
                        console.log(err.message)
                        res.redirect('/admin/createDoc')
                    })
            } else {
                console.log('Doctor Exist')
                res.redirect('/admin/showDocInfo')
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
}
//update student
function editDocInfo(req, res) {
    const id = req.params.id;
    Doctors.findById(id)
        .then((doctor) => {
            Subjects.find()
                .then((subject) => {
                    res.render('adminPages/doctorInfo/editDoc', { doctor, subject, layout: 'layouts/layout.ejs' })
                })
        })
        .catch((err) => console.log(err.message))
}

function updateDocInfo(req, res) {
    const id = req.params.id;

    // get password from form and encrypt it
    const password = req.body.Doc_password;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    Doctors.findById(id)
        .then((doctor) => {
            doctor.Doc_name = req.body.Doc_name
            doctor.Doc_password = hashPassword
            doctor.SUB_name = req.body.SUB_name
            // console.log(hashPassword);

            doctor.save();
            res.redirect('/admin/showDocInfo')
        })
        .catch((err) => console.log(err.message))
}

// delete doctor
function deleteDocInfo(req, res) {
    const id = req.params.id;
    Doctors.findById(id)
        .then((doctor) => {
            doctor.deleteOne({ _id: id })
            res.redirect('/admin/showDocInfo')
        })
}

module.exports = {
    showDoc_Info,
    createDoc,
    storeDoc,
    editDocInfo,
    updateDocInfo,
    deleteDocInfo
}