function adminMiddleware(req, res, next){
    if (req.session.userLogged) {
        if (req.session.userLogged.role_id === 1) {
            return next();
        } else {
            return res.redirect("/");
        }
    }
    next();
    }

module.exports = adminMiddleware;