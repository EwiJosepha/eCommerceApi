'use strict'
const connection = require('../config/dbConnect')
const express = require('express')
const router = express.Router()

router.post('/:id/update', function (req, res, next) {

  const id = req.params.id
  const {
    productName,
    productQuantity,
    productUrl,
    similarProduts,
    productCategory
  } = req.body
  const updatedata = `UPDATE products  SET productName=?,productQuantity=?, productUrl=?, similarProduts=? WHERE productId=?;`
  const productCategoryUpdateQuery = `UPDATE productCategory SET ProductCategory=? WHERE categoryId= categoryId`;

  const values = [productName, productQuantity, productUrl, JSON.stringify(similarProduts), id];

  const catvalues = [productCategory, id]

  console.log("Query executed:", updatedata);
  console.log("Query values:", values);

  connection.beginTransaction(function (err) {
    if (err) {
      return next(err);
    }

    connection.query(updatedata, values, function (err, productData) {
      if (err) {
        return connection.rollback(function () {
          next(err);
        });

      }
      connection.query(productCategoryUpdateQuery, catvalues, function (error, productCategoryData) {
        if (error) {
          return connection.rollback(function () {
            next(error);
          });
        }

        connection.commit(function (err) {
          if (err) {
            returnconnection.rollback(function () {
              next(err);
            });
          }
          console.log('Transaction Complete.');
          res.status(200).send({ productData, productCategoryData });
        });
      })
    })
  })
})

module.exports = router