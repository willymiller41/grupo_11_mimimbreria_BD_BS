function editorMiddleware(req, res, next){
    if (req.session.userLogged) {
        if (req.session.userLogged.role_id === 1 || req.session.userLogged.role_id === 2) {
            return next();
        } else {
            return res.redirect("/");
        }
    }
    next();
    }

module.exports = editorMiddleware;