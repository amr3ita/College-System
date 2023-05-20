const express = require('express'),
    router = express.Router(),
    homeController = require('../app/controllers/admin/home.controller'),
    departmentController = require('../app/controllers/admin/department.controller'),
    subjectController = require('../app/controllers/admin/subject.controller'),
    studentController = require('../app/controllers/admin/student.cotroller'),
    doctorController = require('../app/controllers/admin/doctor.controller');

// Home Page
router.get('/', homeController.adminHome)

// Departments
router.get('/showDept', departmentController.showDept)
router.get('/createDept', departmentController.createDept)
router.post('/createDept', departmentController.storeDept)
router.get('/:id/editDept', departmentController.editDept)
router.post('/:id/editDept', departmentController.updateDept)
router.get('/:id/deleteDept', departmentController.deleteDept)

// Subjects
router.get('/showSub', subjectController.showSub)
router.get('/createSub', subjectController.createSub)
router.post('/createSub', subjectController.storeSub)
router.get('/:id/editSub', subjectController.editSub)
router.post('/:id/editSub', subjectController.updateSub)
router.get('/:id/deleteSub', subjectController.deleteSub)

// Students
router.get('/showStuInfo', studentController.showStu_info)
router.get('/createStu', studentController.createStu)
router.post('/createStu', studentController.storeStu)
router.get('/:id/editStuInfo', studentController.editStuInfo)
router.post('/:id/editStuInfo', studentController.updateStuInfo)
router.get('/:id/deleteStuInfo', studentController.deleteStuInfo)

//Doctors
router.get('/showDocInfo', doctorController.showDoc_Info)
router.get('/createDoc', doctorController.createDoc)
router.post('/createDoc', doctorController.storeDoc)
router.get('/:id/editDocInfo', doctorController.editDocInfo)
router.post('/:id/editDocInfo', doctorController.updateDocInfo)
router.get('/:id/deleteDocInfo', doctorController.deleteDocInfo)

module.exports = router;