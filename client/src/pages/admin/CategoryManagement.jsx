import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategories } from "../../slice/categorySlice";

export const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, page, limit, total, category } = useSelector(
    (state) => state.categories
  );

  const initFetch = useCallback(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  console.log("categories", categories);

  return (
    <div className="container">
      <div className="w-full overflow-x-hidden border-t flex flex-col ">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Category Management</h1>

          <div className="w-full mt-12 ">
            <div className="flex justify-between align-middle p-2">
              <div>
                <p className="text-xl pb-3 flex items-center ">
                  <i className="fa fa-list mr-3 text-sky-500"></i> Categories
                  lists
                </p>
              </div>
              <form
                action="#"
                method="GET"
                className="hidden lg:block lg:pl-3.5"
              >
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-96">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search Category "
                  />
                </div>
              </form>

              <div>
                <Link
                  to="/admin/addCategory"
                  className="border py-2 px-3 bg-sky-500 text-white rounded"
                >
                  <i className="fa fa-plus text-white mr-3"></i> Add Category
                </Link>
              </div>
            </div>
            <div className="bg-white overflow-auto border">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Category Name
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Categoru Description
                    </th>

                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {categories?.length > 0 ? (
                    categories?.map((category) => {
                      return (
                        <tr key={category?._id}>
                          <td className="w-1/3 text-left py-3 px-4">
                            {category?.name}
                          </td>
                          <td className="text-left py-3 px-4">
                            <a
                              className="hover:text-blue-500"
                              href="tel:622322662"
                            >
                              {category?.description.slice(0, 20).concat("...")}
                            </a>
                          </td>

                          <td className="text-left py-3 px-4">
                            <Link to={`/admin/categories/${category?._id}`}>
                              <i className="fa fa-eye border p-2 bg-green-600 text-white rounded"></i>
                            </Link>
                            {/* <button
                              onClick={() => handleDelete(category?._id)}
                              className="ml-2"
                            >
                              <i className="fa fa-trash border p-2 bg-red-700 text-white rounded"></i>
                            </button> */}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>No Categpry Found</>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
