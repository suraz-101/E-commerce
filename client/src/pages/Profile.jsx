import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/login";
import { getCurrentUser } from "../utils/sessionManager";

export const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (isLoggedIn()) {
      const { name, email } = JSON.parse(getCurrentUser());
      setUserProfile({ name: name, email: email });
    }
  }, []);
  return (
    <div className="flex container border mx-auto p-4 ">
      <div className="sidebar  w-80 p-4">
        <h1>Hello, {userProfile?.name}</h1>
        <div>
          <h1 className="text-xl mt-4 font-bold">Manage my Account</h1>
          <div className="flex flex-col pl-4 py-4">
            <Link to="my"> My Porfile</Link>
            <Link to="address"> Address Book</Link>
            <Link to=""> My Porfile</Link>
          </div>
        </div>
      </div>

      <div className="main border w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};
