module.exports = function (req, res, next) {
    // since this comes after 

    if (!req.user.isAdmin) return res.status(403).send("Not uh, can't do that!")
    next();
}