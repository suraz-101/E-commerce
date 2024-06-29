import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, listProducts } from "../slice/productSlice";
import { useCallback } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../contants";
import { Link } from "react-router-dom";
import _ from "underscore";
import { current } from "@reduxjs/toolkit";
import { Comment } from "../components/Comment";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, products } = useSelector((state) => state.products);
  const { pathname } = useLocation();

  const id = pathname.split("/")[2];

  const initFetch = useCallback(() => {
    dispatch(getSingleProduct(id));
    dispatch(listProducts());
  }, [dispatch, id]);

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

  console.log("product is :", product[0]);
  console.log("products are :", products);
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
                  <span className="text-5xl sm:text-7xl">
                    Rs. {product[0]?.price}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                  {product[0]?.description}
                </p>
                <div className="flex mt-8">
                  <a
                    href="#"
                    className="uppercase py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-sky-500 text-pink-500 dark:text-white hover:bg-gradient-to-r from-cyan-400 to-sky-500  hover:text-white text-md"
                  >
                    Read more
                  </a>
                </div>
              </div>
              <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                <img
                  src={BASE_URL.concat(product[0]?.image)}
                  className="max-w-xs h-full md:max-w-sm m-auto"
                />
              </div>
            </div>
          </div>
        </main>
        <div className=" continer border mt-4 p-6 ">
          <Comment url={window.location.href} id={id} title={id} />
        </div>
        <div className="mt-16">
          <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {relatedData()?.map((p) => {
              return (
                <div
                  className=" w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
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
                  <Link to={`/productsDetail/${p?._id}`} key={p?._id}>
                    <div className="px-5 py-3">
                      <h3 className="text-gray-700 uppercase">{p?.name}</h3>
                      <span className="text-gray-500 mt-2">${p?.price}</span>
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
