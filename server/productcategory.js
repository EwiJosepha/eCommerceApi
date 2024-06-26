'use strict'
const connection = require("../config/dbConnect")
const express = require('express')
const router = express.Router()



router.get('/:categoryName', function (req, res, next) {
  const { categoryName } = req.params
  console.log("cat", categoryName);
  const query =
    `select
    products.productId,
    products.productName,
    products.productQuantity,
    products.productUrl,
    products.categoryId,
    products.similarProduts,
    productCategory.productCategory
  FROM
    products
  JOIN
    productCategory ON products.categoryId = productCategory.categoryId where productCategory.productCategory
  ="${categoryName}"
  ;`

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