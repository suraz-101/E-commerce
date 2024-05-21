const ProductModel = require("./product.model");

const createProduct = async (payload) => {
  console.log("controller product", payload);
  const product = await ProductModel.create(payload);
  if (!product) throw new Error("cannot create product. Please try again!!");
  return "product created successfully";
};

const getAllProducts = async (search, page = 1, limit = 10) => {
  const query = [];

  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(`${search?.name}`, "gi"),
      },
    });
  }

  query.push(
    {
      $lookup: {
        from: "cateogories",
        localField: "category",
        foreignField: "_id",
        as: "productCategory",
      },
    },
    {
      $unwind: {
        path: "$productCategory",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        categoryName: "$productCategory.name",
        categoyDescription: "$productCategory.description",
      },
    },
    {
      $project: {
        category: 0,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    }
  );

  const result = await ProductModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total,
    page: +page,
    limit: +limit,
  };
};

const getProductById = async (_id) => {
  if (!_id) throw new Error("id is required");
  return  await ProductModel.findOne({ _id });
};

const updateProductDetails = (_id, payload) => {};

const updateProduct = (_id, payload) => {};

const deleteProduct = (_id) => {};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductDetails,
  updateProduct,
  deleteProduct,
};
