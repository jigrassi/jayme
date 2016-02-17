var express = require("express");

var app = express();

// middleware
app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}`);
    next();
});

app.use(express.static("./app"));

app.listen(3000);

console.log("App running in port 3000");

module.export = app;