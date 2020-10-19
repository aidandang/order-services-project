const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const itemSchema = new Schema({
  product: {
    type: Object
  },
  color: {
    type: String
  },
  size: {
    type: String
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
  origOrderNumber: {
    type: String
  },
  status: {
    type: String
  },
  orderedDate: {
    type: Date
  },
  items: {
    type: [itemSchema]
  },
  recvShippingCost: {
    type: Number,
    default: 0
  },
  saleTax: {
    type: Number,
    default: 0
  },
  recvAddress: {
    type: Object
  },
  customer: {
    type: Object
  },
  orderSalePrice: {
    type: Number
  },
  dlvdShippingCost: {
    type: Number
  },
  dlvdAddress: {
    type: Object
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
  },
});

orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderNumber',
  startAt: 1,
  incrementBy: 1
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;