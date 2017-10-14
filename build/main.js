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

app.get('/btc_idr', function (req, res) {
	connection.query("select sum(amount*price) as totalSell from btc_idr where type=\"sell\" ; select sum(amount*price) as totalBuy from btc_idr where type=\"buy\"", function (err, result) {
		if (err) throw err;
		console.log(result);
		var btc_idr = Object.assign({}, result[0][0], result[1][0]);
		res.send(btc_idr);
	});
});
var server = app.listen(port, function () {
	console.log('Express listening on port', port);
});