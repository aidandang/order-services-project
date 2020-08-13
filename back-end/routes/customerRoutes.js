const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, customerController.readCustomers)
  .post(authController.protect, customerController.createCustomer);

router
  .route('/:id')
  .get(authController.protect, customerController.readCustomerById)
  .patch(authController.protect, authController.restrictTo('admin'), customerController.updateCustomer)
  .delete(authController.protect, authController.restrictTo('admin'), customerController.deleteCustomer);

router
  .route('/:id/shippinginfo')
  .post(authController.protect, customerController.addShippingInfo);

router
  .route('/:id/shippinginfo/:sid')
  .patch(authController.protect, authController.restrictTo('admin'), customerController.updateShippingInfo)
  .delete(authController.protect, authController.restrictTo('admin'), customerController.deleteShippingInfo);
  
module.exports = router;