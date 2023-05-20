const Doctors = require('../../models/admin/doctors.js'),
    Students = require('../../models/admin/students.js'),
    Admins = require('../../models/admin/admins.js'),
    authentication = require('../../Middleware/authentication.js'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');


function loginForm(req, res) {
    res.render('Login/login.ejs', { layout: false });
}

function checkLogin(req, res) {
    const loggedUser = {
        email: req.body.email,
        pasword: req.body.password,
        type: req.body.type
    }
    if (loggedUser.type == "admin") {
        // if the logged user is admin
        Admins.findOne({ $and: [{ ADMIN_EMAIL: loggedUser.email }, { ADMIN_PASSWORD: loggedUser.pasword }] })
            .then((data) => {
                if (data) {
                    //add token for admin
                    const adminToken = {
                        _id: data._id,
                        email: data.ADMIN_EMAIL
                    }
                    const jwtToken = jwt.sign(adminToken, process.env.JWT_SECRET)
                    console.log(jwtToken);

                    res.cookie('token', jwtToken);
                    res.redirect('/admin')
                } else {
                    res.redirect('/login')
                }
            })
    } else if (loggedUser.type == "student") {
        // if the logged user is student
        Students.findOne({ $and: [{ Stu_email: loggedUser.email }] })
            .then((data) => {
                if (data) {
                    const isCorrect = bcrypt.compareSync(loggedUser.pasword, data.Stu_password)
                    if (isCorrect) {
                        //add token for student
                        const studentToken = {
                            _id: data._id,
                            email: data.Stu_email
                        }
                        const jwtToken = jwt.sign(studentToken, process.env.JWT_SECRET)
                        res.cookie('token', jwtToken);

                        res.redirect('/admin/showStuInfo')
                    } else {
                        console.log("Wrong Passwoed")
                        res.redirect('/login')
                    }
                } else {
                    res.redirect('/login')
                }
            })
    } else if (loggedUser.type == "doctor") {
        // if the logged user is doctor
        Doctors.findOne({ $and: [{ Doc_email: loggedUser.email }] })
            .then((data) => {
                if (data) {
                    const isCorrect = bcrypt.compareSync(loggedUser.pasword, data.Doc_password)
                    if (isCorrect) {
                        //add token for doctor
                        const doctorToken = {
                            _id: data._id,
                            email: data.Stu_email
                        }
                        const jwtToken = jwt.sign(doctorToken, process.env.JWT_SECRET)
                        res.cookie('token', jwtToken);

                        res.redirect('admin/showDocInfo')
                    } else {
                        console.log("Wrong Passwoed")
                        res.redirect('/login')
                    }
                } else {
                    res.redirect('/login')
                }
            })
    } else {
        res.redirect('login')
    }
}

function logout(req, res) {
    res.clearCookie('token')
    res.redirect('/login');
}

module.exports = {
    loginForm,
    checkLogin,
    logout
}