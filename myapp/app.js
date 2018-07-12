var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hello World!");
});

app.get("/home", function(req, res) {
    res.send("Hello World from /home!");
});

app.use(express.static("public"));

var server = app.listen(3000, function() {
    console.log("Example app listening at http://localhost:3000/index.html");
    console.log("shimo interview test question did by liguodong.");
});