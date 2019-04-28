var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.locals.tickets = require('./tickets.json');

//GET home page
app.get('/', function(req, res){
  res.render('index');
});

//GET for getting all tickets
app.get('/rest/list', function(req, res){
  res.render('all');
});

//POST for a ticket id search
app.post('/rest/list', urlencodedParser, function(req, res){
  var id = req.body.id;
  res.redirect('/rest/ticket/' + id);
});

//GET for getting 1 ticket
app.get('/rest/ticket/:id', function(req, res){
  res.render('single', {output: req.params.id});
});

//GET to render the create a new ticket page
app.get('/rest/ticket', function(req, res){
  res.render('create');
});

//POST for creating a new ticket
app.post('/rest/ticket', urlencodedParser, function(req, res){
  res.render('ticket-new', {data: req.body});

  fs.writeFile('tickets.json', JSON.stringify(req.body, null, 2), finished);
  function finished(err){
    console.log('New Ticket Submitted and Saved.');
  }
});

app.listen(process.env.PORT);
console.log('Listening on port 3000...');
