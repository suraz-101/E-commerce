import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newArrivals } from "../slice/productSlice";
import _ from "underscore";
import { useState } from "react";
import { BASE_URL } from "../contants";
import { isLoggedIn } from "../utils/login";
import { addToCart } from "../slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newArrival, page, limit } = useSelector((state) => state.products);
  const [sort] = useState(-1);
  const [category, setCategory] = useState("All");
  const initFetch = useCallback(() => {
    dispatch(newArrivals({ sort, page, limit, category }));
  }, [dispatch, sort, limit, page, category]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  // const newArvl = () => {
  //   return newArrivals?.data?.slice(0, 2);
  // };

  // const { categories, category } = useSelector((state) => state.categories);

  return (
    <div className="bg-backgroundColor transition-all">
      <div className="container mx-auto p-6">
        <div
          className="h-64 rounded-md overflow-hidden bg-cover bg-center border"
          style={{
            backgroundImage: `url(
              "https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144"
            )`,
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">Sport Shoes</h2>
              <p className="mt-2 text-gray-400">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore facere provident molestias ipsam sint voluptatum
                pariatur.
              </p>
              <button className="flex items-center mt-4 px-3 py-2 bg-gradient-to-r from-cyan-400 to-sky-500 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Shop Now</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex mt-8 md:-mx-4">
          <div
            className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 border"
            style={{
              backgroundImage: `url(
                "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              )`,
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Back Pack</h2>
                <p className="mt-2 text-gray-400">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore facere provident molestias ipsam sint voluptatum
                  pariatur.
                </p>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <span>Shop Now</span>
                  <svg className="h-5 w-5 mx-2" viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2 border"
            style={{
              backgroundImage: `url(
                "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              )`,
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Games</h2>
                <p className="mt-2 text-gray-400">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore facere provident molestias ipsam sint voluptatum
                  pariatur.
                </p>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-secondaryColor text-2xl font-medium">
            New Arrivals
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {newArrival?.data?.length > 0 &&
              newArrival?.data?.slice(0, 4).map((p) => {
                return <ProductCard data={p} key={p?._id} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
