const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const itemSchema = new Schema({
  product: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  size: {
    type: String,
    required: true
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
    type: Number,
    default: 0
  },
  saleTax: {
    type: Number,
    default: 0
  },
  localCharge: {
    type: Number,
    default: 0
  },
  receivedDate: {
    type: Date
  },
  shippingCost: {
    type: Number,
    default: 0
  }
});

const refSchema = new Schema({
  refNumber: {
    type: String,
    required: true
  },
  refDate: {
    type: Date,
    required: true
  },
  refInfo: {
    type: String,
    required: true
  },
  refAttachFile: {
    type: String
  },
  refStatus: {
    type: String
  },
  paymentMethod: {
    type: String
  }
});

const revSchema = new Schema({
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new Schema({
  customer: {
    type: Object,
    required: true
  },
  shippingAddress: {
    type: String
  },
  items: [itemSchema],
  paidAmount: {
    type: Number,
    default: 0
  },
  user: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  },
  ref: refSchema,
  rev: [revSchema]
});

orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderNumber',
  startAt: 1,
  incrementBy: 1
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;