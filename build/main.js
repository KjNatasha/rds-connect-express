'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbconfig = require(__dirname + '/../server/config/db-config.json');
var connection = _mysql2.default.createConnection(dbconfig);

var app = (0, _express2.default)();
var port = 3000;

app.use('/', _express2.default.static(__dirname + "/../public"));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/man', function (req, res) {
	connection.query("SELECT * FROM btc_idr", function (err, rows) {
		if (err) throw err;
		console.log(rows);
		res.send(rows);
	});
});
var server = app.listen(port, function () {
	console.log('Express listening on port', port);
});