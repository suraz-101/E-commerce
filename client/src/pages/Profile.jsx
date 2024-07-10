import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/login";
import { getCurrentUser } from "../utils/sessionManager";

export const Profile = () => {
  const { pathname } = useLocation();

  const [path, setPath] = useState("my");

  useEffect(() => {
    setPath(pathname.split("/")[2] || "my");
  }, [pathname]);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (isLoggedIn()) {
      const { name, email } = JSON.parse(getCurrentUser());
      setUserProfile({ name, email });
    }
  }, []);

  return (
    <div className="bg-backgroundColor transition-all">
      <div className="flex container mx-auto p-4">
        <div className="sidebar w-80 p-4 text-primaryColor">
          <h1>Hello, {userProfile?.name}</h1>
          <div>
            <h1 className="text-xl mt-4 font-bold">Manage my Account</h1>
            <div className="flex flex-col pl-4 py-4">
              <Link
                to="my"
                className={`${
                  path === "my" ? "text-sky-500" : "text-secondaryColor"
                } py-2`}
              >
                <i
                  className={`fa fa-user mr-1 ${
                    path === "my" ? "text-sky-500" : "text-secondaryColor"
                  }`}
                ></i>
                My Profile
              </Link>
              <Link
                to="address"
                className={`${
                  path === "address" ? "text-sky-500" : "text-secondaryColor"
                } py-2`}
              >
                <i
                  className={`fa fa-book mr-1 ${
                    path === "address" ? "text-sky-500" : "text-secondaryColor"
                  }`}
                ></i>
                Address Book
              </Link>
              <Link
                to="changePassword"
                className={`${
                  path === "changePassword"
                    ? "text-sky-500"
                    : "text-secondaryColor"
                } py-2`}
              >
                <i
                  className={`fa fa-key mr-1 ${
                    path === "changePassword"
                      ? "text-sky-500"
                      : "text-secondaryColor"
                  }`}
                ></i>
                Change Password
              </Link>
            </div>
          </div>
        </div>

        <div className="main border w-full p-4 text-secondaryColor">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
