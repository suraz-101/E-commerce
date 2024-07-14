import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Paginate } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";
import { addToCart } from "../slice/cartSlice";
import { listCategories } from "../slice/categorySlice";
import { listProducts, setLimit, setPage } from "../slice/productSlice";
import { isLoggedIn } from "../utils/login";

export const Products = () => {
  const dispatch = useDispatch();
  const { products, page, limit, total, product, loading } = useSelector(
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
    dispatch(listProducts({ page: newPage, limit, category }));
  };

  const handleSetLimit = (newLimit) => {
    dispatch(setLimit(newLimit));
    dispatch(listProducts({ page: 1, limit: newLimit, category })); // reset to page 1 when limit changes
  };

  const handleCategoryChange = (newCategory, newCategoryName) => {
    setCategory(newCategory);
    setCategoryName(newCategoryName);
    dispatch(setPage(1)); // reset to page 1 when category changes
    dispatch(listProducts({ page: 1, limit, category: newCategory }));
  };

  console.log(loading);
  console.log("products list ", products);

  // console.log("product", product[0]);

  return (
    <div className="bg-backgroundColor transition-all">
      <div className="container mx-auto px-6">
        <div className="categoryList bg-secondaryBacgroundColor rounded p-2 flex justify-evenly text-secondaryColor mb-4 shadow transition-all">
          <Link
            onClick={(e) => {
              handleCategoryChange("All", "All");
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
                      handleCategoryChange(category?._id, category?.name);
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
          {products?.total === 1 ? (
            <>{products?.total} Product</>
          ) : (
            <>{products?.total - 1}+ Products</>
          )}
          {/* {products?.total - 1}+ Products */}
        </span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {loading ? (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse">
              <div className="relative flex items-end justify-end h-56 w-full bg-slate-700 rounded-md">
                <div className="absolute w-full h-full z-0 rounded-md"></div>
                <div className="p-2 rounded-full bg-slate-700 text-white mx-5 -mb-4 z-10">
                  <div className="h-5 w-5 bg-slate-700 rounded-full"></div>
                </div>
              </div>
              <div className="px-5 py-3 bg-secondaryBacgroundColor animate-pulse">
                <div className="h-2 bg-slate-700 rounded mb-2"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          ) : products?.data?.length > 0 ? (
            products?.data?.map((p) => {
              return <ProductCard data={p} key={p?._id} />;
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
