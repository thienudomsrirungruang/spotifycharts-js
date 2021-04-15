
var log = require("loglevel");

// GET /
exports.index = (req, res) => {
    log.debug("get /")
    res.render("home.pug", {
        title: "Home"
    });
};