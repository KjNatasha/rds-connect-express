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

var initial_epoch_time = parseInt(new Date(Date.UTC(2017, 9, 15, 0, 0, 0)).getTime() / 1000) - 60 * 60 * 7;
var one_day_to_seconds = 24 * 60 * 60;

app.use('/', _express2.default.static(__dirname + "/../public"));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.get('/daily_trades/:tableName', function (req, res) {
    var tableName = req.params.tableName;
    var trades_all = [];
    var now = new Date();
    var current_epoch_time = parseInt(now.getTime() / 1000);

    var interval = (current_epoch_time - initial_epoch_time) / one_day_to_seconds;
    console.log(initial_epoch_time);
    console.log(current_epoch_time);
    console.log(interval);

    for (var i = 0; i < interval; i++) {
        trades_all.push(daily_trades(i, tableName));
    }
    Promise.all(trades_all).then(function (trades_row_objects) {
        res.send(trades_row_objects);
    }, function (err) {
        console.log('err', err);
    });
});

var daily_trades = function daily_trades(day) {
    var tableName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "btc_idr";

    return new Promise(function (resolve, reject) {
        var date_min = initial_epoch_time + one_day_to_seconds * day;
        var date_max = date_min + one_day_to_seconds;
        var date_query = 'date>=' + date_min.toString() + ' AND date<' + date_max.toString();

        connection.query('select sum(amount*price) as sell from ' + tableName + ' where (type="sell" AND ' + date_query + ') ; ' + ('select sum(amount*price) as buy from ' + tableName + ' where (type="buy" AND ' + date_query + '); ') + ('select count(*) as count from ' + tableName + ' where ' + date_query), function (err, result) {
            var dateString = new Date(date_min * 1000 + 60 * 60 * 7);
            var fullDateString = dateString.getFullYear() + '-' + (dateString.getMonth() + 1) + '-' + dateString.getDate();
            var row_object = Object.assign({ "date": fullDateString }, result[0][0], result[1][0], result[2][0]);
            console.log(tableName + ' row_object : ', row_object);
            resolve(row_object);
        });
    });
};

var server = app.listen(port, function () {
    console.log('Express listening on port', port);
});