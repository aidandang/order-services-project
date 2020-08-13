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