const ProductModel = require("./product.model");
const { ObjectId } = require("mongodb");
const { generateSlug } = require("../../utils/slug");

const createProduct = async (payload) => {
  payload.slug = generateSlug(payload.name) + "-" + Date.now();
  console.log("controller product", payload);
  const product = await ProductModel.create(payload);
  if (!product) throw new Error("cannot create product. Please try again!!");
  return "product created successfully";
};

const getAllProducts = async (sort = 1, search, page = 1, limit = 10) => {
  const query = [];

  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(`${search?.name}`, "gi"),
      },
    });
  }

  if (sort) {
    query.push({
      $sort: {
        createdAt: Number(sort),
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

const getProductById = async (slug, page = 1, limit = 20) => {
  if (!slug) throw new Error("slug is required");
  const query = [];

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
      $match: {
        slug: new RegExp(`${slug}`, "gi"),
      },
    },
    // {
    //   $match: {
    //     _id: new ObjectId(`${_id}`),
    //   },
    // },
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

const updateProductDetails = async (_id, payload) => {
  const update = await ProductModel.updateOne({ _id }, payload);
  if (!update) throw new Error("product update failed. Please Try Again!!");
  return "product updated successfully";
};

const updateProduct = async (_id, stockQuantity) => {
  const update = await ProductModel.updateOne({ _id }, { stockQuantity });
};

const deleteProduct = async (_id) => {
  const res = await ProductModel.deleteOne({ _id });
  if (!res) throw new Error("cannot delete product");
  return "Product Deleted Successfully";
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductDetails,
  updateProduct,
  deleteProduct,
};
