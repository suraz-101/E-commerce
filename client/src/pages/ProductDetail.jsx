import { useLocation, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, listProducts } from "../slice/productSlice";
import { useCallback } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../contants";
import { Link } from "react-router-dom";
import _ from "underscore";
import { current } from "@reduxjs/toolkit";
import { Comment } from "../components/Comment";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../slice/cartSlice";
import { isLoggedIn } from "../utils/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// var Rating = require("rating");
// import { Rating } from "rating";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, page, limit, total, product } = useSelector(
    (state) => state.products
  );
  const [sort] = useState(1);
  const { pathname } = useLocation();
  const [category, setCategory] = useState("All");

  const slug = pathname.split("/")[2];

  const initFetch = useCallback(() => {
    dispatch(getSingleProduct(slug));
    dispatch(listProducts({ page, sort, limit, category }));
  }, [dispatch, slug, page, sort, limit, category]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const relatedData = (number = 4) => {
    const currentData = product[0];

    const filterRelatedData = products?.data?.filter(
      (data) => data._id !== currentData?._id
    );
    return _.sample(filterRelatedData, number);
  };
  // const colors = ["red", "green", "yellow", "white", "blue"];
  console.log("product is :", products);
  // console.log("products are :", products);
  return (
    <div className="bg-backgroundColor transition-all">
      <div className="container mx-auto py-6 ">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* <!-- Product Image --> */}
            <div className="md:w-1/2">
              <img
                src={BASE_URL.concat(product[0]?.image)}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
            </div>
            {/* <!-- Product Details --> */}
            <div className="p-6 md:w-1/2">
              <h1 className="text-3xl font-semibold text-gray-800">
                {product[0]?.name}
              </h1>
              <p className="mt-4 text-gray-600">
                {product[0]?.description.slice(0, 100).concat("...")}
              </p>
              <div className="flex items-center mt-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${product[0]?.price}
                </span>
              </div>
              <div className="mt-4">
                {product[0]?.stockQuantity > 0 ? (
                  <h1 className="text-green-500  fw-bolder text-3xl">
                    In Stock
                  </h1>
                ) : (
                  <h1 className="text-red-500  text-3xl">Out of Stock</h1>
                )}
              </div>
              <div className="mt-4">
                {/* <!-- Available Colors --> */}
                <h2 className="text-lg font-semibold text-gray-800">
                  Available Colors
                </h2>
                <div className="flex space-x-2 mt-2">
                  {product[0]?.colors?.length > 0 &&
                    product[0]?.colors.map((color, index) => {
                      return (
                        <button
                          style={{ backgroundColor: color }}
                          className={` block w-6 h-6 rounded-full border`}
                          value={color}
                          key={index}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="mt-4">
                {/* <!-- Available Sizes --> */}
                <h2 className="text-lg font-semibold text-gray-800">
                  Available Sizes
                </h2>
                <div className="flex space-x-2 mt-2">
                  <span className="px-3 py-1 border rounded-lg text-gray-700">
                    S
                  </span>
                  <span className="px-3 py-1 border rounded-lg text-gray-700">
                    M
                  </span>
                  <span className="px-3 py-1 border rounded-lg text-gray-700">
                    L
                  </span>
                  <span className="px-3 py-1 border rounded-lg text-gray-700">
                    XL
                  </span>
                  {/* <!-- Add more sizes as needed --> */}
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={() => {
                    isLoggedIn()
                      ? product[0]?.stockQuantity > 0
                        ? dispatch(addToCart(product[0]))
                        : alert("Product is out of stock")
                      : navigate("/login");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Additional Information --> */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-primaryColor">
              Product Details
            </h2>
            <p className="mt-2 text-secondaryColor">
              {product[0]?.description}
            </p>
          </div>
        </div>

        <div className=" continer border mt-4 p-6 ">
          <Comment
            url={window.location.href}
            id={slug}
            title={slug}
            className="text-primaryColor"
          />
        </div>
        <div className="mt-16">
          <h3 className="text-primaryColor text-2xl font-medium">
            More Products
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {relatedData()?.map((p) => {
              return (
                <div
                  className=" w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-secondaryBacgroundColor"
                  key={p?._id}
                >
                  <div className=" relative flex items-end justify-end h-56 w-full  ">
                    <img
                      src={BASE_URL.concat(p?.image[0])}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                      className="absolute w-full h-full z-0"
                    />
                    <button className="p-2 rounded-full bg-sky-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 z-10 ">
                      <svg className="h-5 w-5" fill="white">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </button>
                  </div>
                  <Link to={`/productsDetail/${p?.slug}`} key={p?._id}>
                    <div className="px-5 py-3">
                      <h3 className="text-primaryColor uppercase">{p?.name}</h3>
                      <span className="text-primaryColor mt-2">
                        ${p?.price}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
