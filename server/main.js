import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import path from 'path';


let dbconfig = require(__dirname+'/../server/config/db-config.json');
let connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;

app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/btc_idr', (req, res) =>{
	connection.query("select sum(amount*price) as totalsell from btc_idr where type=\"sell\"", (err, totalSell) => {
		let btc_idr = Object.assign({},totalSell)
		if(err) throw err;
		connection.query("select sum(amount*price) as totalbuy from btc_idr where type=\"buy\"", (err, totalBuy) => {
			btc_idr = Object.assign(btc_idr, totalBuy)
			if(err) throw err;

		});
		console.log(btc_idr);
		res.send(btc_idr);
	});
});
const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});

