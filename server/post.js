'use strict'
const connection = require('../config/dbConnect')
const express = require('express')
const router = express.Router()


router.post('/', function (req, res, next) {
  const {
    productName,
    productQuantity,
    productUrl,
    categoryId,
    similarProduts,
    productCategory
  } = req.body;

  console.log("body", req.body);

  const productCategoryQuery = `INSERT INTO productCategory (productCategory) VALUES (?)`;
  const products = `INSERT INTO products (productName,  productQuantity, productUrl, categoryId, similarProduts) values (?, ?, ?, ?, ?)`;

  connection.beginTransaction(function (err) {
    if (err) {
      return next(err);
    }

    // Insert into Productcategory table

    connection.query(productCategoryQuery, [productCategory], function (error, results) {
      if (error) {
        console.log("products querry executed");

        return connection.rollback(function () {
          next(error);
        });
      }

      // Insert into products table

      connection.query(products, [ productName, productQuantity, productUrl, categoryId, JSON.stringify(similarProduts)], function (error, results) {

        if (error) {
          return connection.rollback(function () {
            next(error);
          });
        }

        // Insert into mealInstructions table
        connection.commit(function (err) {
          if (err) {
            return connection.rollback(function () {
              next(err);
            });
          }
          console.log('Transaction Complete.');
          res.status(201).send(results);
        });
      });
    });
  });
});

module.exports = router

