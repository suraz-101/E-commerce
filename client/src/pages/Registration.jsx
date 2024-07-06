import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userRegistration } from "../slice/authSlice";
import { Notify } from "../components/Notify";

export const Registration = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const [add, setAdd] = useState({
    street: "",
    houseNumber: "",
    place: "",
    ward: "",
    city: "",
  });
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { street, houseNumber, place, ward, city } = add;
    const address = `${street} street,${houseNumber} house no.,${place} ,${ward}-${city}`;
    const updatedPayload = { ...payload, address };
    dispatch(userRegistration(updatedPayload));
    // console.log("registration", error);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <Link to="/">
            <div className="absolute top-5 right-10 py-1 px-2 bg-sky-500 text-white transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              X
            </div>
          </Link>
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
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Name"
                      value={payload.name}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                      value={payload.email}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                      value={payload.password}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Phone Number"
                      value={payload.phoneNumber}
                      onChange={(e) => {
                        setPayload((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }));
                      }}
                    />
                    <label
                      htmlFor="phoneNumber"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Phone Number
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 mt-4">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="street"
                        name="street"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Street"
                        value={add.street}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            street: e.target.value,
                          }));
                        }}
                      />
                      <label
                        htmlFor="street"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Street
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="houseNumber"
                        name="houseNumber"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="House Number"
                        value={add.houseNumber}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            houseNumber: e.target.value,
                          }));
                        }}
                      />
                      <label
                        htmlFor="houseNumber"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        House Number
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="place"
                        name="place"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Place"
                        value={add.place}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            place: e.target.value,
                          }));
                        }}
                      />
                      <label
                        htmlFor="place"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Place
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="ward"
                        name="ward"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Ward"
                        value={add.ward}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            ward: e.target.value,
                          }));
                        }}
                      />
                      <label
                        htmlFor="ward"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer                   -placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Ward
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="city"
                        name="city"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="City"
                        value={add.city}
                        onChange={(e) => {
                          setAdd((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }));
                        }}
                      />
                      <label
                        htmlFor="city"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        City
                      </label>
                    </div>
                  </div>
                  <div className="text-center">
                    {(error || message) && (
                      <div
                        className={`${
                          error ? "text-red-600" : "text-green-500"
                        }`}
                      >
                        <Notify
                          variant={error ? "danger" : "success"}
                          msg={error || message}
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative mt-4">
                    <button className="bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 transition-all">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="w-full flex justify-center mt-4">
            Already have an Account?{" "}
            <span className="text-blue-500 mx-2">
              <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
