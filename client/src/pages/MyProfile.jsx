import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleUser, updateUser } from "../slice/userSlice";
import { getCurrentUser } from "../utils/sessionManager";

export const MyProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const {
    name: initialName,
    email,
    phone: initialPhone,
  } = JSON.parse(getCurrentUser());

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);

  useEffect(() => {
    dispatch(getSingleUser(email));
  }, [email, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateUser({ email, name, phoneNumber }));
    setIsEditing(false);
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold">Your Profile</h1>
      </div>
      <div className="details border p-4">
        <h1 className="py-3">
          <span className="text-lg font-bold">Name: </span>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1"
            />
          ) : (
            <span>{name}</span>
          )}
        </h1>
        <h1 className="py-3">
          <span className="text-lg font-bold">Email: </span>
          <span>{email}</span>
        </h1>
        <h1 className="py-3">
          <span className="text-lg font-bold">Phone Number: </span>
          {isEditing ? (
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border p-1"
            />
          ) : (
            <span>{phoneNumber}</span>
          )}
        </h1>
      </div>
      <div className="p-4">
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="border mx-4 sm:mx-2 py-1 px-4 bg-gradient-to-r from-cyan-400 to-sky-500 text-white"
          >
            <i className="fa fa-save text-white mr-3"></i> Save
          </button>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="border mx-4 sm:mx-2 py-1 px-4 bg-gradient-to-r from-cyan-400 to-sky-500 text-white"
            >
              <i className="fa fa-edit text-white mr-3"></i> Update Settings
            </button>
          </>
        )}
      </div>
    </div>
  );
};
