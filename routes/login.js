const express = require('express'),
    router = express.Router(),
    Login = require('../app/controllers/Login/login.js')

router.get('/', Login.loginForm)
router.post('/', Login.checkLogin)
router.get('/logout', Login.logout)

module.exports = router
