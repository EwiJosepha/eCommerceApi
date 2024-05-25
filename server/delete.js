'use strict'
const connection = require('../config/dbConnect')
const express = require('express')
const router = express.Router()

router.delete("/:id", function (req, res, next) {
  const id = req.params.id
  const deletedquery = `delete from products WHERE products.productId = ${id};`
  connection.query(deletedquery, (err, data) => {
    if (err) {
      console.log(err);
      if (err.message === "not found") next()
      else {
        next()
      }
    } else {
      res.send(data)
    }
  })
})

module.exports = router