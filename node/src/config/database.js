var config = require('./config');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.userName,
  password : config.password,
  database : config.database,
  multipleStatements: true
});
connection.connect(function(err){	
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;