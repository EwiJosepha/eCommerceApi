'use strict'
const connection = require("../config/dbConnect")
const express = require("express")
const router = express.Router()

router.get('/:id', function (req, res, next) {
  const id = req.params.id

  const querry = `select products.productId, productName, productQuantity, productUrl, products.categoryId,products.similarProduts, productCategory.productCategory ,productDescription.description from products  join productCategory on products.categoryId = productCategory.categoryId join productDescription ON productCategory.categoryId = productDescription.descriptionId where products.productId = ${id}`


  connection.query(querry, (err, data) => {
    if (err) {
      next(err)
    } else {
      if ((data.length === 0)) {
        let error = new Error(`product with  ${id} not found`)
        error.status = 404;
        res.status(404).send(error);
        // next(error);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(data[0])

      }
    }
  })
})

module.exports = router