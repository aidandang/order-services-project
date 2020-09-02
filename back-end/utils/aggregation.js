exports.productAggregate = (match) => ([
  { 
    $match: match
  },
  {
    $addFields: {
      convertedId: { $toObjectId: "$brandId" }
    }
  },
  { 
    $lookup: {
      from: "brands",
      localField: "convertedId",
      foreignField: "_id",
      as: "brand"
    }
  },
  { 
    $project: {
      __v: 0,
      convertedId: 0
    }
  }
])

exports.orderAggregate = (match) => ([
  { 
    $match: match
  },
  {
    $addFields: {
      convertedCustomerId: { $toObjectId: "$customerId" }
    }
  },
  { 
    $lookup: {
      from: "customers",
      localField: "convertedCustomerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  { 
    $project: {
      __v: 0,
      convertedCustomerId: 0
    }
  }
])