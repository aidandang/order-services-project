const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, productController.readProducts)
  .post(authController.protect, productController.createProduct);  

router
  .route('/:id')
  .get(authController.protect, productController.readProductById)
  .patch(authController.protect, authController.restrictTo('admin'), productController.updateProductById)
  .delete(authController.protect, authController.restrictTo('admin'), productController.deleteProductById)

router
  .route('/:id/colors/')
  .post(authController.protect, productController.addColor);

router
  .route('/:id/colors/:sid')
  .patch(authController.protect, authController.restrictTo('admin'), productController.updateColor)
  .delete(authController.protect, authController.restrictTo('admin'), productController.deleteColor);
  
module.exports = router;