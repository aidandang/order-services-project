const Brand = require('../models/brandModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.readBrands = catchAsync(async (req, res, next) => {
  let query = Brand.find();

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('name');
  }

  const brands = await query;

  res.status(200).json({
    status: 'GET_SUCCESS',
    brands
  });
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const newBrand = await Brand.create(req.body);
  res.status(201).json({
    status: 'POST_SUCCESS',
    brand: newBrand
  });
});

exports.updateBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res
    .status(200)
    .json({
      status: 'PATCH_SUCCESS',
      brand
    });
})

exports.deleteBrand = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  
  const brand = await Brand.findByIdAndDelete(id);

  res
    .status(200)
    .json({
      status: 'DELETE_SUCCESS',
      brand
    });
});