const express = require('express');
const router = express.Router();
const products = require('../controller/productosController');

router
    .post('/allProducts', products.getAllProducts)
    .post('/saleProducts', products.saleProducts)
    .get('/getProductsByC/:category', products.getProductsByCategory)

module.exports = router;