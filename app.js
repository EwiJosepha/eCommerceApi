require("dotenv").config()
var createError = require("http-errors")
var express = require("express")
const cors = require("cors")
var path = require('path')
const bodyParser = require("body-parser")

//declare routes here
const products = require('./server/products.js')
const productsbyId = require('./server/productsById.js')
const postProducts = require('./server/post.js')
const update = require('./server/update.js')
const deleteproduct = require('./server/delete.js')
const category = require('./server/byCategory.js')

var app = express()
app.use(bodyParser.json())

//view engine setup

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


//register routes here
app.use('/', products)
app.use('/productsById', productsbyId)
app.use('/post', postProducts)
app.use('/', update)
app.use('/delete', deleteproduct)
app.use('/category', category)


//catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404))
})

//error handler 

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
