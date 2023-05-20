const Departments = require('../../models/admin/departments');
// --------------------Departments-----------------------------

// show departments
function showDept(req, res) {
    Departments.find({})
        .then((department) => {
            res.render('adminPages/departments/departments.ejs', { department, layout: 'layouts/layout.ejs' })
        })
        .catch((err) => console.log(err.message));
}
// create deaprtment
function createDept(req, res) {
    res.render('adminPages/departments/createDept.ejs', { layout: 'layouts/layout.ejs' })
}
//store department in database
function storeDept(req, res) {
    //take data from form
    const department = Departments({
        DP_name: req.body.DP_name,
        DP_code: req.body.DP_code
    });

    Departments.find({ $or: [{ DP_name: department.DP_name }, { DP_code: department.DP_code }] })
        .then((data) => {
            if (data.length == 0) {
                //save data in database
                department.save()
                    .then(department => {
                        console.log(department)
                        res.redirect('/admin/showDept')
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.redirect('/admin/createDept')
                    })
            } else {
                console.log('Department exist');
                res.redirect('/admin/showDept')
            }
        })
        .catch(err => console.log(err.message));
}
//update department
function editDept(req, res) {
    const id = req.params.id;
    Departments.findById(id)
        .then((department) => {
            res.render('adminPages/departments/editDept.ejs', { department, layout: 'layouts/layout.ejs' })
        })
        .catch((err) => console.log(err.message))
}

function updateDept(req, res) {
    const id = req.params.id;
    Departments.findById(id)
        .then((department) => {
            department.DP_name = req.body.DP_name
            department.DP_code = req.body.DP_code

            department.save();
            res.redirect('/admin/showDept')
        })
        .catch(err => console.log(err.message))
}
//delete department
function deleteDept(req, res) {
    const id = req.params.id;
    Departments.findById(id)
        .then((department) => {
            department.deleteOne({ _id: id })
            res.redirect('/admin/showDept')
        })
        .catch(err => console.log(err.message))
}

module.exports = {
    showDept,
    storeDept,
    createDept,
    editDept,
    updateDept,
    deleteDept
}