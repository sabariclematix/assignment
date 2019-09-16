var express=require("express");
var bodyParser=require('body-parser');
var routing=require('./routing');
var app = express();
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, crm-token");
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(routing);
app.listen(PORT);