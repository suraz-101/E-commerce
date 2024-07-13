import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../contants";
import { addToCart } from "../slice/cartSlice";
import { isLoggedIn } from "../utils/login";

export const ProductCard = (p) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("prodcucts", p?.data);
  return (
    <>
      <div
        className=" w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden "
        key={p?.data?._id}
      >
        <div className=" relative flex items-end justify-end h-56 w-full  ">
          <img
            src={BASE_URL.concat(p?.data?.image[0])}
            alt=""
            style={{ height: "100%", width: "100%" }}
            className="absolute w-full h-full z-0"
          />
          <button
            className="p-2 rounded-full bg-sky-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 z-10 "
            onClick={() => {
              isLoggedIn()
                ? p?.data?.stockQuantity > 0
                  ? dispatch(addToCart(p?.data))
                  : alert("product is out of stock")
                : navigate("/login");
            }}
          >
            <svg className="h-5 w-5" fill="white">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>
        </div>
        <Link to={`/productsDetail/${p?.data?.slug}`} key={p?.data?._id}>
          <div className="px-5 py-3 bg-secondaryBacgroundColor">
            <h3 className="text-primaryColor uppercase">{p?.data?.name}</h3>
            <span className="text-secondaryColor mt-2">${p?.data?.price}</span>
          </div>
        </Link>
      </div>
    </>
  );
};
