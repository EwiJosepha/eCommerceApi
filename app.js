require("dotenv").config()
const createError = require("http-errors")
const express = require("express")
const cors = require("path")
const bodyParser = require("body-parser")

//declare routes here
const products = require('/server/products')

const app = express()
app.use(bodyParser.json())

//view engine setup

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


//register routes here
app.use('/products', products)

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
module.exports = app
