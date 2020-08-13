const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const colorSchema = new Schema({
  color: {
    type: String,
    required: true
  },
  url: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    trim: true,
    default: ''
  } 
});

const revSchema = new Schema({
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  brandId: {
    type: String,
    required: true
  },
  styleCode: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    default: ''
  },
  desc: {
    type: String
  },
  colors: {
    type: [colorSchema]
  },
  rev: {
    type: [revSchema]
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Query Middleware
productSchema.pre(/^find/, function(next) {
  this.find({ 
    active: { 
      $eq: true 
    }
  });
  next();
})

// Aggregation Middleware
productSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ 
    $match: { 
      active: { 
        $eq: true 
      }
    }
  });
  next();
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;