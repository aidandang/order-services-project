const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(productController.readProducts)
  .post(productController.createProduct);  

router
  .route('/:id')
  .get(productController.readProductById)
  .patch(authController.restrictTo('admin'), productController.updateProductById)
  .delete(authController.restrictTo('admin'), productController.deleteProductById)

router
  .route('/:id/colors/')
  .post(productController.addColor);

router
  .route('/:id/colors/:sid')
  .patch(authController.restrictTo('admin'), productController.updateColor)
  .delete(authController.restrictTo('admin'), productController.deleteColor);
  
module.exports = router;