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
})