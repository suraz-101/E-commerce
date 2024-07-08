import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Paginate } from "../components/Pagination";
import { BASE_URL } from "../contants";
import { addToCart } from "../slice/cartSlice";
import { listCategories } from "../slice/categorySlice";
import { listProducts, setLimit, setPage } from "../slice/productSlice";
import { isLoggedIn } from "../utils/login";

export const Products = () => {
  const dispatch = useDispatch();
  const { products, page, limit, total, product } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.categories);
  const [sort] = useState(1);
  const [category, setCategory] = useState("All");
  const [categoryName, setCategoryName] = useState("All");

  const navigate = useNavigate();

  const initFetch = useCallback(() => {
    dispatch(listProducts({ page, sort, limit, category }));
    dispatch(listCategories());
  }, [dispatch, sort, limit, page, category]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const handleSetPage = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(listProducts({ page: newPage, limit }));
  };

  const handleSetLimit = (newLimit) => {
    dispatch(setLimit(newLimit));
    dispatch(listProducts({ page: 1, limit: newLimit })); // reset to page 1 when limit changes
  };

  console.log("products list ", products);

  // console.log("product", product[0]);

  return (
    <div className="bg-backgroundColor transition-all">
      <div className="container mx-auto px-6">
        <div className="categoryList border p-4 flex justify-evenly text-secondaryColor mb-4">
          <Link
            onClick={(e) => {
              setCategory("All");
            }}
          >
            All
          </Link>

          {categories?.length > 0 &&
            categories?.map((category) => {
              return (
                <div key={category?._id}>
                  <Link
                    onClick={(e) => {
                      setCategory(category?._id);
                      setCategoryName(category?.name);
                    }}
                    key={category?._id}
                  >
                    {category?.name}
                  </Link>
                </div>
              );
            })}
        </div>
        <h3 className="text-primaryColor text-2xl font-medium">
          {categoryName}
        </h3>
        <span className="mt-3 text-sm text-secondaryColor">
          {products?.total - 1}+ Products
        </span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products?.data?.length > 0 ? (
            products?.data?.map((p) => {
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
                    <button
                      className="p-2 rounded-full bg-sky-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 z-10 "
                      onClick={() => {
                        isLoggedIn()
                          ? p?.stockQuantity > 0
                            ? dispatch(addToCart(p))
                            : alert("product is out of stock")
                          : navigate("/login");
                      }}
                    >
                      <svg className="h-5 w-5" fill="white">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </button>
                  </div>
                  <Link to={`/productsDetail/${p?.slug}`} key={p?._id}>
                    <div className="px-5 py-3 bg-secondaryBacgroundColor">
                      <h3 className="text-primaryColor uppercase">{p?.name}</h3>
                      <span className="text-secondaryColor mt-2">
                        ${p?.price}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="  w-full p-4 text-red-500">Product Not Found</div>
          )}
        </div>
        <div className="flex justify-center  py-5">
          {" "}
          <Paginate
            setPage={handleSetPage}
            setLimit={handleSetLimit}
            limit={limit}
            page={page}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};
