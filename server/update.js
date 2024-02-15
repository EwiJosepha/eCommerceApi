'use strict'
const connection = require('../config/dbConnect')
const express = require('express')
const router = express.Router()

router.post('/:id/:catId/update', function (req, res, next) {

  const id = req.params.id
  const catId = req.params.catId
  console.log(catId);
  const {
    productName,
    productQuantity,
    productUrl,
    productCategory
  } = req.body
  console.log(req.body);
  const updatedata = `UPDATE products  SET productName=?,productQuantity=?, productUrl=? WHERE productId=${id};`
  const productCategoryUpdateQuery = `UPDATE productCategory SET ProductCategory=? WHERE categoryId= ${catId}`;
  const values = [productName, productQuantity, productUrl, id];
  const catvalues = [productCategory, catId]
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