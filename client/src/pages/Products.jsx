import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../contants";
import { listProducts } from "../slice/productSlice";

export const Products = () => {
  const dispatch = useDispatch();
  const { products, page, limit, total, product } = useSelector(
    (state) => state.products
  );

  const initFetch = useCallback(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  console.log(
    "P",
    products?.data?.map((p) => {
      return p?.image[0];
    })
  );

  return (
    <div>
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">200+ Products</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products?.data?.length > 0 ? (
            products?.data?.map((p) => {
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
            })
          ) : (
            <div className="border border-black">Product Not Found</div>
          )}
        </div>
        <div className="flex justify-center">
          <div className="flex rounded-md mt-8">
            <a
              href="#"
              className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
            >
              <span>Previous</span>
            </a>
            <a
              href="#"
              className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
            >
              <span>1</span>
            </a>
            <a
              href="#"
              className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
            >
              <span>2</span>
            </a>
            <a
              href="#"
              className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
            >
              <span>3</span>
            </a>
            <a
              href="#"
              className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
            >
              <span>Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
