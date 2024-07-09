import { useState } from "react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Paginate } from "../../components/Pagination";
import { BASE_URL } from "../../contants";
import {
  deleteSingleProduct,
  listProducts,
  setPage,
  setLimit,
} from "../../slice/productSlice";

export const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, page, limit, total, product } = useSelector(
    (state) => state.products
  );

  const navigate = useNavigate();
  const [sort] = useState(-1);
  const [category] = useState("All");

  const initFetch = useCallback(() => {
    dispatch(listProducts({ page, sort, limit, category }));
  }, [dispatch, sort, limit, page, category]);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteSingleProduct(id)).then(() => {
        initFetch();
      });
    },
    [dispatch, initFetch]
  );

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

  console.log("products", products);

  return (
    <div className="container">
      <div className="w-full overflow-x-hidden border-t flex flex-col ">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Product Management</h1>

          <div className="w-full mt-12 ">
            <div className="flex justify-between align-middle p-2">
              <div>
                <p className="text-xl pb-3 flex items-center ">
                  <i className="fa fa-list mr-3 text-sky-500"></i> Product lists
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
                    placeholder="Search product "
                  />
                </div>
              </form>

              <div>
                <Link
                  to="/admin/addProduct"
                  className="border py-2 px-3 bg-sky-500 text-white rounded"
                >
                  <i className="fa fa-plus text-white mr-3"></i> Add Product
                </Link>
              </div>
            </div>
            <div className="bg-white overflow-auto border">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className=" text-center py-3 px-4 uppercase font-semibold text-sm">
                      Product Image
                    </th>

                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                      Description
                    </th>
                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                      Price
                    </th>
                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                      Category
                    </th>
                    <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {products?.data?.length > 0 ? (
                    products?.data?.map((product) => {
                      return (
                        <tr key={product?._id}>
                          <td className=" py-3 px-4 ">
                            <img
                              src={BASE_URL.concat(product?.image)}
                              alt=""
                              height="200px"
                              width="200px"
                            />
                            <h1 className=" py-2"> {product?.name}</h1>
                          </td>

                          <td className="text-left py-3 px-4">
                            <a
                              className="hover:text-blue-500"
                              href="tel:622322662"
                            >
                              {product?.description.slice(0, 20).concat("...")}
                            </a>
                          </td>
                          <td className="text-left py-3 px-4">
                            <a
                              className="hover:text-blue-500"
                              href="mailto:jonsmith@mail.com"
                            >
                              {product?.price}
                            </a>
                          </td>
                          <td className="text-left py-3 px-4">
                            <a
                              className="hover:text-blue-500"
                              href="mailto:jonsmith@mail.com"
                            >
                              {product?.categoryName}
                            </a>
                          </td>
                          <td className="text-left py-3 px-4">
                            <Link to={`${product?._id}`}>
                              <i className="fa fa-eye border p-2 bg-green-600 text-white rounded"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(product?._id)}
                              className="ml-2"
                            >
                              <i className="fa fa-trash border p-2 bg-red-700 text-white rounded"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>No Product Found</>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
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
  );
};
