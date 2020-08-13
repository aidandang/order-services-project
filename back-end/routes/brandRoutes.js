const express = require('express');
const brandController = require('../controllers/brandController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, brandController.readBrands)
  .post(authController.protect, brandController.createBrand);

router
  .route('/:id')
  .patch(authController.protect, brandController.updateBrand)
  .delete(authController.protect, brandController.deleteBrand);
  
module.exports = router;