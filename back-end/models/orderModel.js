const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const itemSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
  colorId: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  size: {
    type: String
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  saleTax: {
    type: Number
  },
  localCharge: {
    type: Number
  },
  receivedDate: {
    type: Date
  },
  shippingCost: {
    type: Number,
    default: 0
  }
});

const revSchema = new Schema({
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new Schema({
  customerId: {
    type: String,
    required: true
  },
  addressId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  items: [itemSchema],
  paidAmount: {
    type: Number
  },
  orderedDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  },
  rev: [revSchema]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;