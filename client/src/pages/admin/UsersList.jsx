import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listUsers } from "../../slice/userSlice";

export const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const initFetch = useCallback(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  console.log("users", users.data);

  return (
    <div className="container">
      <div className="w-full overflow-x-hidden border-t flex flex-col ">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Users Management</h1>

          <div className="w-full mt-12 ">
            <div className=" flex justify-between  align-middle p-2">
              <div>
                <p className="text-xl pb-3 flex items-center ">
                  <i className="fa fa-list mr-3"></i> Users lists
                </p>
              </div>
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
    </div>
  );
};
