import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { verifyOTP } from "../slice/authSlice";
import { Notify } from "../components/Notify";

export const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { error, message } = useSelector((state) => state.auth);

  const [payload, setPayload] = useState({
    email: state.email,
    newPassword: "",
    otp: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOTP(payload));
    // error ? alert(error) : navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <Link to="/forgetPassword">
            <div className="absolute top-5 right-10 py-1 px-2 bg-sky-500 text-white transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              X
            </div>
          </Link>
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Verify Otp Code</h1>
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
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={payload?.email}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="newPassword"
                      value={payload?.newPassword}
                      onChange={(e) => {
                        setPayload((prev) => {
                          return { ...prev, newPassword: e.target.value };
                        });
                      }}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      New Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="otpCode"
                      name="otpCode"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="otpCode"
                      value={payload?.otp}
                      onChange={(e) => {
                        setPayload((prev) => {
                          return { ...prev, otp: e.target.value };
                        });
                      }}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      OTP code
                    </label>
                  </div>
                  <div>
                    {(error || message) &&
                      (error ? (
                        <Notify variant="danger" msg={error} />
                      ) : (
                        <Notify variant="success" msg={message} />
                      ))}
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

          <div className="w-full flex justify-center mt-2">
            <span className="text-blue-500 mx-2">
              <Link to="/forgetPassword"> Resent Code?</Link>
              OR
              <Link to="/forgetPassword"> sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
