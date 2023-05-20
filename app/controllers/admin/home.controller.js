//admin hame page
function adminHome(req, res) {
    res.render('adminPages/index.ejs', { layout: 'layouts/layout.ejs' })
}

module.exports = {
    adminHome
}