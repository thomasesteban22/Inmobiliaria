var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var hbs = require("hbs");

var index = require('./routes/index');
var users = require('./routes/users');
var propiedad = require("./routes/propiedad");
var admin = require("./routes/admin");
var garaje = require('./routes/garaje');
var bano = require("./routes/bano");
var tipoDePropiedad = require("./routes/tipoDePropiedad");
var tipoDeInmueble = require("./routes/tipoDeInmueble")
var agente = require("./routes/agente")
var data = require("./routes/data")

mongoose.connect("mongodb://localhost/Inmobiliaria");
//var propiedadModel = require("./models/propiedad");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//helpers
require("./helpers/saludoHelper")(hbs);
require("./helpers/mostrarEstadoHelper")(hbs);
require("./helpers/mostrarEstrellasHelper")(hbs);

//partials
hbs.registerPartials(__dirname +"/views/partials", function(data){

});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/propiedad', propiedad);
app.use('/admin', admin);
app.use('/garaje', garaje);
app.use('/bano', bano);
app.use('/tipoDePropiedad', tipoDePropiedad);
app.use('/tipoDeInmueble', tipoDeInmueble);
app.use('/agente', agente);
app.use('/data', data);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Test connection 
var db = mongoose.connection;
db.on("error", console.error.bind(console,"Error de conexion" ));
db.once("open", function(){
  console.log("Conectado ;)")
});

module.exports = app;