const Departments = require('../../models/admin/departments'),
    Subjects = require('../../models/admin/subjects');
// --------------------subjects-----------------------------

//show subjects
function showSub(req, res) {
    Subjects.find({})
        .then((subjects) => {
            res.render('adminPages/subjects/subjects.ejs', { subjects, layout: 'layouts/layout.ejs' })
        })
        .catch((err) => console.log(err.message));
}
// create subject
function createSub(req, res) {
    Departments.find({})
        .then((department) => {
            Subjects.find({})
                .then((subject) => {
                    res.render('adminPages/subjects/createSub.ejs', { department, subject, layout: 'layouts/layout.ejs' })
                })
                .catch(err => console.log(err.message))
        })
        .catch(err => console.log(err.message))
}
//store subject in database
function storeSub(req, res) {
    //take data from form
    const subject = Subjects({
        SUB_name: req.body.SUB_name,
        SUB_code: req.body.SUB_code,
        DB_name: req.body.DB_name,
        Pre_Req: req.body.Pre_Req
    });

    Subjects.find({ $or: [{ SUB_name: subject.SUB_name }, { SUB_code: subject.SUB_code }] })
        .then((data) => {
            if (data.length == 0) {
                // save data in database
                subject.save()
                    .then((subject) => {
                        console.log(subject)
                        res.redirect('/admin/showSub')
                    })
                    .catch(err => {
                        console.log(err.message)
                        res.redirect('/admin/createSub')
                    })
            } else {
                console.log('Subject exist')
                res.redirect('/admin/showSub')
            }
        }
        )
        .catch(err => err.message)
}

//update subject
function editSub(req, res) {
    const id = req.params.id;
    Departments.find({})
        .then((department) => {
            Subjects.findById(id)
                .then((subject) => {
                    Subjects.find()
                        .then((allSubject) => {
                            res.render('adminPages/subjects/editSub.ejs', { department, subject, allSubject, layout: 'layouts/layout.ejs' })
                        })
                        .catch((err) => console.log(err.message))
                })
                .catch((err) => console.log(err.message))
        })
        .catch((err) => console.log(err.message))

}
function updateSub(req, res) {
    const id = req.params.id;
    Subjects.findById(id)
        .then(async (subject) => {
            subject.SUB_name = req.body.SUB_name
            subject.SUB_code = req.body.SUB_code
            subject.DB_name = req.body.DB_name
            subject.Pre_Req = req.body.Pre_Req

            await subject.save();
            res.redirect('/admin/showSub')
        })
        .catch(err => console.log(err.message))
}
//delete department
function deleteSub(req, res) {
    const id = req.params.id;
    Subjects.findById(id)
        .then((subject) => {
            subject.deleteOne({ _id: id })
            res.redirect('/admin/showSub')
        })
        .catch(err => console.log(err.message))
}

module.exports = {
    showSub,
    createSub,
    storeSub,
    editSub,
    updateSub,
    deleteSub
}