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
// var Rating = require("rating");
// import { Rating } from "rating";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, products } = useSelector((state) => state.products);
  const { pathname } = useLocation();

  const slug = pathname.split("/")[2];

  const initFetch = useCallback(() => {
    dispatch(getSingleProduct(slug));
    dispatch(listProducts());
  }, [dispatch, slug]);

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
  const colors = ["red", "green", "yellow", "white", "blue"];
  console.log("product is :", product[0]?.colors);
  // console.log("products are :", products);
  return (
    <div className="bg-backgroundColor transition-all">
      <div className="container mx-auto py-6 ">
        <main className="dark:bg-gray-800 bg-white relative overflow-hidden ">
          <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto px-6 flex relative py-16">
              <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
                <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                  {product[0]?.name}
                  <span className="text-2xl sm:text-4xl text-red-700 mt-4">
                    $ {product[0]?.price}
                  </span>
                </h1>
                <div className="flex  ">
                  {/* Stock : {product[0]?.stockQuantity} */}

                  <div>
                    {product[0]?.stockQuantity > 0 ? (
                      <h1 className="text-green-500 mt-10 fw-bolder text-3xl">
                        In Stock
                      </h1>
                    ) : (
                      <h1 className="text-red-500 mt-10 text-3xl">
                        Out of Stock
                      </h1>
                    )}
                  </div>
                </div>
                <div className="flex mt-10">
                  {[...Array(5)].map((star, index) => {
                    return (
                      <FaStar
                        className="text-orange-600"
                        size={50}
                        key={index}
                      />
                    );
                  })}
                </div>
                <div className="flex mt-10 text-secondaryColor">
                  Available Colors:{" "}
                  {product[0]?.colors.length > 0 &&
                    product[0]?.colors.map((color, index) => {
                      return (
                        <div
                          style={{ backgroundColor: color }}
                          className={` h-5 w-5 mx-2 rounded-full border `}
                          key={index}
                        ></div>
                      );
                    })}
                </div>

                {/* <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                  {product[0]?.description.slice(0, 100).concat("...")}
                </p> */}
                <div className=" mt-8">
                  <button
                    className="p-2 bg-sky-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 z-10 flex"
                    onClick={() => {
                      isLoggedIn()
                        ? product[0]?.stockQuantity > 0
                          ? dispatch(addToCart(product[0]))
                          : alert("Product is out of stock")
                        : navigate("/login");
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" fill="white">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>{" "}
                    Add To Cart
                  </button>

                  {/* <a
                    onClick={() => {}}
                    className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-sky-500 text-pink-500 dark:text-white hover:bg-gradient-to-r from-cyan-400 to-sky-500  hover:text-white text-md"
                  >
                    Read more
                  </a> */}
                </div>
              </div>
              <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                <img
                  src={BASE_URL.concat(product[0]?.image)}
                  className="max-w-xs h-full md:max-w-sm m-auto"
                  height="400px"
                  width="400px"
                />
              </div>
            </div>
          </div>
          <div className="p-16">
            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
              {product[0]?.description}
            </p>
          </div>
        </main>
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
                  className=" w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden border"
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
