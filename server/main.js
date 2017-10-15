import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import path from 'path';


let dbconfig = require(__dirname+'/../server/config/db-config.json');
let connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;

const initial_epoch_time = parseInt(new Date(Date.UTC(2017,9,15,0,0,0)).getTime() / 1000) - (60 * 60 * 7)
const one_day_to_seconds = 24 * 60 * 60;

app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/daily_trades/:tableName', (req, res) => {
    let tableName = req.params.tableName;
    let trades_all = [];
    var now = new Date();
    let current_epoch_time = parseInt(now.getTime() / 1000);

    let interval = (current_epoch_time - initial_epoch_time) / one_day_to_seconds
    console.log(initial_epoch_time)
    console.log(current_epoch_time)
    console.log(interval)

    for(var i=0; i < interval; i++) {
        trades_all.push(daily_trades(i, tableName))
    }
    Promise.all(trades_all)
        .then(trades_row_objects => {
            res.send(trades_row_objects);
        }, (err) => {
            console.log('err', err);
        });
});

let daily_trades = (day, tableName="btc_idr") => {
    return new Promise((resolve, reject) => {
        let date_min = initial_epoch_time + (one_day_to_seconds * day);
        let date_max = date_min + one_day_to_seconds;
        let date_query = `date>=${date_min.toString()} AND date<${date_max.toString()}`;

        connection.query(`select sum(amount*price) as sell from ${tableName} where (type=\"sell\" AND ${date_query}) ; ` +
            `select sum(amount*price) as buy from ${tableName} where (type=\"buy\" AND ${date_query}); ` +
            `select count(*) as count from ${tableName} where ${date_query}`, function (err, result) {
            let dateString = new Date(date_min * 1000 + (60 * 60 * 7));
            let fullDateString = `${dateString.getFullYear()}-${dateString.getMonth()+1}-${dateString.getDate()}`
            let row_object = Object.assign({"date": fullDateString}, result[0][0], result[1][0], result[2][0]);
            console.log(`${tableName} row_object : `, row_object);
            resolve(row_object);
        })
    });
};

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});