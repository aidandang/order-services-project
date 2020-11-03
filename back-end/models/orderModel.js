const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const infoSchema = new Schema({
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
  }
})

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
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    required: true
  },
  note: {
    type: String
  }
});

const costSchema = new Schema({
  shippingCost: {
    type: Number,
    default: 0
  },
  saleTax: {
    type: Number,
    default: 0
  },
  totalCost: {
    type: Number,
    required: true
  }
})

const receivingSchema = new Schema({
  status: {
    type: String,
    require: true
  },
  tracking: {
    type: String
  },
  recvDate: {
    type: Date
  },
  warehouse: {
    type: Object,
    require: true
  }
})

const saleSchema = new Schema({
  salePrice: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    default: 0
  },
  customer: {
    type: Object,
    required: true
  }
})

const orderSchema = new Schema({
  info: {
    type: infoSchema,
    require: true
  },
  items: {
    type: [itemSchema]
  },
  cost: {
    type: costSchema,
    required: true
  },
  receiving: {
    type: receivingSchema,
    require: true
  },
  sale: {
    type: saleSchema,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  attachments: {
    type: Array
  },
  createdBy: {
    type: Object
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;