var express = require('express'),
  cors = require('cors'), // This is required for cross origin resource sharing - as we will be accessing port 3001 from 3000
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test'); 


app.use(cors()), //using cross origin resource sharing in our rest service.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
}); // if no route found for a wrong url etc. send this messages


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
