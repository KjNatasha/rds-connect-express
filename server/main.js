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

app.get('/man', (req, res) =>{
	connection.query("SELECT * FROM btc_idr", (err, rows) => {
		if(err) throw err;
		console.log(rows);
		res.send(rows);
	});
});
const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});