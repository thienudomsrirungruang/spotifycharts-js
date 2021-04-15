const express = require("express");
const errorHandler = require("errorhandler");
const chalk = require("chalk");
const dotenv = require("dotenv");

// logging
var log = require("loglevel");
const prefix = require("loglevel-plugin-prefix");
const colors = {
    TRACE: chalk.magenta,
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red,
};

prefix.reg(log);
log.enableAll();
prefix.apply(log, {
    format(level, name, timestamp) {
        return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](`${level}`)}${chalk.green(":")}`;
    },
});


dotenv.config({path: ".env"});

const app = express();

// globals
app.set("port", process.env.PORT);

// error handler
if(process.env.NODE_ENV === "development") {
    app.use(errorHandler());
} else {
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send("Server Error");
    });
}

// setup controllers
const homeController = require("./controllers/home");

// routing
app.get("/", homeController.index);

// start Express server
app.listen(app.get("port"), () => {
    log.info("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
})

module.exports = app;

