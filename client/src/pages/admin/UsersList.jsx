import React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Paginate } from "../../components/Pagination";
import { listUsers, setLimit, setPage } from "../../slice/userSlice";

export const UsersList = () => {
  const dispatch = useDispatch();
  const { users, page, total, limit } = useSelector((state) => state.users);
  const [email, setEmail] = useState();

  const initFetch = useCallback(() => {
    dispatch(listUsers({ email, limit, page }));
  }, [dispatch, email, limit, page]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const handleSetPage = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(listUsers({ page: newPage, limit }));
  };

  const handleSetLimit = (newLimit) => {
    dispatch(setLimit(newLimit));
    dispatch(listUsers({ page: 1, limit: newLimit })); // reset to page 1 when limit changes
  };

  console.log("users", limit);

  return (
    <div className="container">
      <div className="w-full overflow-x-hidden border-t flex flex-col ">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Users Management</h1>

          <div className="w-full mt-12 ">
            <div className=" flex justify-between  align-middle p-2">
              <div>
                <p className="text-xl pb-3 flex items-center ">
                  <i className="fa fa-list mr-3 text-sky-500"></i> Users lists
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
                    placeholder="Search User by Email"
                    onChange={(e) => {
                      setTimeout(() => {
                        setEmail(e.target.value);
                      }, [2000]);
                    }}
                  />
                </div>
              </form>

              <div>
                <Link className="border  py-2 px-3 bg-sky-500 text-white rounded">
                  <i className="fa fa-plus  text-white mr-3"></i> Add Users
                </Link>
              </div>
            </div>
            <div className="bg-white overflow-auto border">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Name
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      email
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {users?.data?.length > 0 ? (
                    users?.data?.map((user) => {
                      return (
                        <tr key={user?.email}>
                          <td className="w-1/3 text-left py-3 px-4">
                            {user?.name}
                          </td>
                          <td className="w-1/3 text-left py-3 px-4">
                            {user?.email}
                          </td>
                          <td className="text-left py-3 px-4">
                            <a
                              className="hover:text-blue-500"
                              href="tel:622322662"
                            >
                              {user?.phoneNumber}
                            </a>
                          </td>
                          <td className="text-left py-3 px-4">
                            <a
                              className="hover:text-blue-500"
                              href="mailto:jonsmith@mail.com"
                            >
                              {user?.role}
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>No Users Found</>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <div className="container py-4 flex justify-center">
        <Paginate
          page={page}
          total={total}
          limit={limit}
          setPage={handleSetPage}
          setLimit={handleSetLimit}
        />
      </div>
    </div>
  );
};
