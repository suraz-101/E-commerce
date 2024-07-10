import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../utils/sessionManager";
import { changePassword } from "../slice/userSlice";
import { Notify } from "../components/Notify";

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.users);
  const { email } = JSON.parse(getCurrentUser());
  const [changePass, setChangePassword] = useState({
    email: email,
    oldPassword: "",
    newPassword: "",
  });

  const handleSaveClick = () => {
    dispatch(changePassword(changePass));
  };
  return (
    <div className="p-4 ">
      {" "}
      <input
        type="text"
        value={email}
        className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5 my-3"
        placeholder="Enter email"
        disabled
      />
      <input
        type="text"
        value={changePass?.oldPassword}
        onChange={(e) => {
          setChangePassword((prevV) => {
            return { ...prevV, oldPassword: e.target.value };
          });
        }}
        className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5 my-3"
        placeholder="Enter Old Password"
      />
      <input
        type="text"
        value={changePass?.newPassword}
        onChange={(e) => {
          setChangePassword((prevV) => {
            return { ...prevV, newPassword: e.target.value };
          });
        }}
        className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5 my-3"
        placeholder="Enter New Password"
      />
      <div className=" p-4 fw-bold text-center text-secondaryColor">
        {(error || message) && (
          <div className={`${error ? "text-red-600" : "text-green-500"}`}>
            {" "}
            <Notify
              variant={error ? "danger" : "success"}
              msg={error || message}
            />
          </div>
        )}
      </div>
      <button
        onClick={handleSaveClick}
        className="border mx-4 sm:mx-2 py-1 px-4 bg-gradient-to-r from-cyan-400 to-sky-500 text-white"
      >
        <i className="fa fa-save text-white mr-3"></i> Change
      </button>
    </div>
  );
};
