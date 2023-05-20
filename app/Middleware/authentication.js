const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    const { token } = req.cookies;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        next();
    } catch (error) {
        console.log("this token not exist");
        return res.redirect('/login');
    }
}

module.exports = {
    authentication
}