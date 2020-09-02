const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json({
    status: 'POST_SUCCESS',
    order: newOrder
  });
});

exports.readOrders = catchAsync(async (req, res, next) => {
  let match = null;

  if (req.query.orderNumber) {
    orderNumber = req.query.orderNumber;
    match = {
      orderNumber: { 
        $eq: parseInt(orderNumber)
      } 
    };  
  }

  if (match === null) {
    match = {}
  }

  let query = Product.aggregate(productAggregate(match))

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = (page - 1) * limit;

  const arr = await query;
  const count = arr.length;
  const pages = Math.ceil(count/limit);

  query = query.skip(skip).limit(limit);
  
  const products = await query;

  res.status(200).json({
    status: 'GET_SUCCESS',
    info: {
      count,
      pages
    },
    products
  });
});