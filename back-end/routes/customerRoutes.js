const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(customerController.readCustomers)
  .post(customerController.createCustomer);

router
  .route('/:id')
  .get(customerController.readCustomerById)
  .patch(authController.restrictTo('admin'), customerController.updateCustomer)
  .delete(authController.restrictTo('admin'), customerController.deleteCustomer);

router
  .route('/:id/shippinginfo')
  .post(customerController.addShippingInfo);

router
  .route('/:id/shippinginfo/:sid')
  .patch(authController.restrictTo('admin'), customerController.updateShippingInfo)
  .delete(authController.restrictTo('admin'), customerController.deleteShippingInfo);
  
module.exports = router;