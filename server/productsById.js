'use strict'
const connection =require ("../config/dbConnect")
const express = require("express")
const router =express.Router()

router.get("/:id", function(req, res, next){
  const id = req.params.body
  const querry =  ``
  connection.query(querry, (err, data) => {
    if (err) {
      next(err)
    } else {
      if ((data.length === 0)) {
        let error = new Error(`mealproject with mealId ${id} not found`)
        error.status = 404;
        res.status(404).send(error);
        next(error);
      } else {
        res.send(data[0])

      }
    }
  })
})

module.exports = router