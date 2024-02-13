'use strick'
const connection = require('../config/dbConnect')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  const query =
    `select * from productCategory
  ;`
  console.log(res.statusCode)
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err)
      if (err.message === "not found") next()
      else next()
    } else {
      res.send(data)

    }
  })

});

module.exports = router