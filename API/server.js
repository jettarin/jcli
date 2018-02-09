var express = require('express'); // Web Framework
var bodyParser = require('body-parser');

var router = express.Router();

// Connection string parameters.

var routes = require('./routes/index');
var app = express();

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);


module.exports = app;
