const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const itemSchema = new Schema({
  product: {
    type: Object,
    required: true
  },
  color: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  qty: {
    type: Number
  },
  price: {
    type: Number
  },
  recvDate: {
    type: Date
  },
  dlvdDate: {
    type: Date
  },
  note: {
    type: String
  }
});

const orderSchema = new Schema({
  merchant: {
    type: Object
  },
  orderNumber: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date
  },
  orderType: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  warehouse: {
    type: Object
  },
  items: {
    type: [itemSchema]
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  saleTax: {
    type: Number,
    default: 0
  },
  customer: {
    type: Object,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    default: 0
  },
  attachments: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Object
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;