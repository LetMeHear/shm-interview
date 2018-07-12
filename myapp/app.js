var express = require("express");
var http = require("http");
var fs = require("fs");
var content = fs.readFileSync("./public/data.json");
var data = JSON.parse(content);
var app = express();

app.get("/", function(req, res) {
    res.send(data);
});

app.get("/home", function(req, res) {
    res.send("Hello World from /home!");
});

app.get("/data", function(req, res) {
    res.send(data);
});

app.use(express.static("public"));

var server = app.listen(3000, function() {
    console.log("Example app listening at http://localhost:3000/index.html");
    console.log("shimo interview test question did by liguodong.");
});
server = http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "http://localhost:3000"
    });
    res.end();
})
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {
//         "Content-Type": "text/plain",
//         "Access-Control-Allow-Origin": "http://localhost:3000"
//     });
//     res.end();
// });
// server.listen(3000, function() {
//     console.log("Example app listening at http://localhost:3000/index.html");
//     console.log("shimo interview test question did by liguodong.");
// });