'use strict'
const connection = require('../config/dbConnect')
const express = require('express')
const router = express.Router()

router.post('/:id/:catId/update', function (req, res, next) {
  const id = req.params.id
  const catId = req.params.catId
  const numberCat = +catId
  console.log(catId);
  const {
    productId,
    productName,
    productQuantity,
    productUrl,
    productCategory
  } = req.body
  console.log(req.body);
  const updatedata = `UPDATE products  SET productName=?,productQuantity=?, productUrl=? WHERE productId=?;`
  const productCategoryUpdateQuery = `UPDATE productCategory SET productCategory=? WHERE categoryId=?`;
  const values = [productName, productQuantity, productUrl, id];
  const catvalues = [productCategory, numberCat]
  console.log(catvalues);
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
            return connection.rollback(function () {
              next(err);
            });
          }
          console.log('Transaction Complete.');
          res.status(200).send({ productData, productCategoryData });
          console.log({productData,productCategoryData});
        });
      })
    })
  })
})

module.exports = router