import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userRegistration } from "../slice/authSlice";
import { Notify } from "../components/Notify";

export const Registration = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegistration(payload));
    console.log("registration", error);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Register</h1>
            </div>
            <form
              action=""
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={payload.name}
                      onChange={(e) => {
                        setPayload((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={payload.email}
                      onChange={(e) => {
                        setPayload((prev) => {
                          return { ...prev, email: e.target.value };
                        });
                      }}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={payload.password}
                      onChange={(e) => {
                        setPayload((prev) => {
                          return { ...prev, password: e.target.value };
                        });
                      }}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="phoneNumber"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Phone Number"
                      value={payload.phoneNumber}
                      onChange={(e) => {
                        setPayload((prev) => {
                          return { ...prev, phoneNumber: e.target.value };
                        });
                      }}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Phone Number
                    </label>
                  </div>
                  <div className="text-center">
                    {(error || message) && (
                      <Notify
                        variant={error ? "danger" : "success"}
                        msg={error || message}
                      ></Notify>
                    )}
                  </div>
                  <div className="relative">
                    <button className="bg-cyan-500 text-white rounded-md px-2 py-1">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="w-full flex justify-center">
            Already have an Account ?
            <span className="text-blue-500 mx-2">
              <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
