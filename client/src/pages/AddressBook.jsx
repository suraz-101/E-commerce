import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "../components/Notify";
import { getSingleUser, updateUserAdd } from "../slice/userSlice";
import { isLoggedIn } from "../utils/login";
import { getCurrentUser } from "../utils/sessionManager";

export const AddressBook = () => {
  const dispatch = useDispatch();
  const { user, error, message } = useSelector((state) => state.users);
  const [add, setAdd] = useState({
    street: "",
    houseNumber: "",
    place: "",
    ward: "",
    city: "",
  });

  const initFetch = useCallback(
    (email) => {
      dispatch(getSingleUser(email));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isLoggedIn()) {
      const { email } = JSON.parse(getCurrentUser());
      initFetch(email);
    }
  }, [initFetch, add]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { street, houseNumber, place, ward, city } = add;
    const newAddress = `${street} street, ${houseNumber} house no., ${place}, ${ward}-${city}`;
    const updatedAddresses = [...(user?.address || []), newAddress];

    await dispatch(updateUserAdd({ id: user?._id, address: updatedAddresses }));

    setAdd({ street: "", houseNumber: "", place: "", ward: "", city: "" });
  };

  return (
    <div>
      <>
        <div className="p-4 ">
          {user?.address?.map((add, index) => {
            return (
              <div className=" p-2 mb-2 " key={index}>
                <h1>{add}</h1>
              </div>
            );
          })}
        </div>
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
        <div className="">
          <div className="grid grid-cols-2 gap-x-4 mt-4 ">
            <div className="relative">
              <input
                autoComplete="off"
                id="street"
                name="street"
                type="text"
                className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5"
                placeholder="Street"
                value={add.street}
                onChange={(e) => {
                  setAdd((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <input
                autoComplete="off"
                id="houseNumber"
                name="houseNumber"
                type="text"
                className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5"
                placeholder="House Number"
                value={add.houseNumber}
                onChange={(e) => {
                  setAdd((prev) => ({
                    ...prev,
                    houseNumber: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <input
                autoComplete="off"
                id="place"
                name="place"
                type="text"
                className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5"
                placeholder="Place"
                value={add.place}
                onChange={(e) => {
                  setAdd((prev) => ({
                    ...prev,
                    place: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <input
                autoComplete="off"
                id="ward"
                name="ward"
                type="text"
                className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5"
                placeholder="Ward"
                value={add.ward}
                onChange={(e) => {
                  setAdd((prev) => ({
                    ...prev,
                    ward: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="relative">
              <input
                autoComplete="off"
                id="city"
                name="city"
                type="text"
                className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5"
                placeholder="City"
                value={add.city}
                onChange={(e) => {
                  setAdd((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <button
            className="border py-2 px-3 bg-sky-500 text-white rounded my-4"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            <i className="fa fa-plus text-white mr-3 "></i> Add New Delivery
            Address Address
          </button>
        </div>
      </>
    </div>
  );
};
