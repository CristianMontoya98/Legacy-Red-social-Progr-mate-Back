const { rsprofiles, users } = require('../models');

rsprofiles.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "firstName",
      as: "orders_info",
    },
  },
  // Deconstructs the array field from the 
  // input document to output a document 
  // for each element 
  {
    $unwind: "$orders_info",
  },
])