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
	connection.query("select sum(amount*price) as totalsell from btc_idr where type=\"sell\"", (err, totalsell) => {
		if(err) throw err;
		console.log(typeof(totalsell));
		res.send(totalsell);
	});
});
const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});

