import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../contants";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "../slice/cartSlice";
import { createNewOrder } from "../slice/orderSlice";
import { getSingleUser } from "../slice/userSlice";
import { currentUser, getCurrentUser } from "../utils/sessionManager";

export const CheckOut = () => {
  const dispatch = useDispatch();
  const { carts, quantity } = useSelector((state) => state.cart);
  const { users, user } = useSelector((state) => state.users);

  const initFetch = useCallback(
    (email) => {
      dispatch(getSingleUser(email));
    },
    [dispatch]
  );

  useEffect(() => {
    const { email } = JSON.parse(getCurrentUser());
    initFetch(email);
  }, [initFetch]);

  const [payload, setPayload] = useState({
    customerId: null,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "Pokhara",
    paymentMethod: "stripe",
    paymentStatus: "pending",
    items: [],
    totalPrice: 0,
  });

  const placeOrder = () => {
    // dispatch(getSingleUse)
    const updatedPayload = {
      ...payload,
      items: carts.map((cartItem) => ({
        productId: cartItem._id,
        productName: cartItem.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
        subtotal: cartItem.price * cartItem.quantity,
      })),
      totalPrice: calculateTotalPrice(),
      // orderDate: new Date(),
      orderStatus: "pending",
      customerId: user?._id,
      customerName: user?.name,
      customerEmail: user?.email,
      customerPhone: user?.phoneNumber,
    };

    setPayload(updatedPayload);
    console.log("payload", updatedPayload);
    dispatch(createNewOrder(updatedPayload));
  };

  const calculateTotalPrice = () => {
    return carts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  console.log("carts", carts);
  // console.log("user", user);
  return (
    <div className="container mx-auto py-6">
      <h3 className="text-gray-700 text-2xl font-medium">Checkout</h3>
      <div className="flex flex-col lg:flex-row mt-8">
        <div className="w-full lg:w-1/2 order-2">
          <div className="flex items-center">
            <button className="flex text-sm text-blue-500 focus:outline-none">
              <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
                1
              </span>{" "}
              Contacts
            </button>
            <button className="flex text-sm text-gray-700 ml-8 focus:outline-none">
              <span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">
                2
              </span>{" "}
              Shipping
            </button>
            <button
              className="flex text-sm text-gray-500 ml-8 focus:outline-none"
              disabled
            >
              <span className="flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2">
                3
              </span>{" "}
              Payments
            </button>
          </div>
          <form className="mt-8 lg:w-3/4">
            <div>
              <h4 className="text-sm text-gray-500 font-medium">
                Delivery method
              </h4>
              <div className="mt-6">
                <button className="flex items-center justify-between w-full bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-600"
                      checked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      MS Delivery
                    </span>
                  </label>

                  <span className="text-gray-600 text-sm">$18</span>
                </button>
                <button className="mt-6 flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      DC Delivery
                    </span>
                  </label>

                  <span className="text-gray-600 text-sm">$26</span>
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-sm text-gray-500 font-medium">
                Delivery address
              </h4>
              <div className="mt-6 flex">
                <label className="block w-3/12">
                  <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1">
                    <option>NY</option>
                    <option>DC</option>
                    <option>MH</option>
                    <option>MD</option>
                  </select>
                </label>
                <label className="block flex-1 ml-3">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
                    placeholder="Address"
                  />
                </label>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-sm text-gray-500 font-medium">Date</h4>
              <div className="mt-6 flex">
                <label className="block flex-1">
                  <input
                    type="date"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
                    placeholder="Date"
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between mt-8">
              <button className="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                </svg>
                <span className="mx-2">Back step</span>
              </button>
              <button className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Payment</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2 ">
          <div className="flex justify-center lg:justify-end ">
            <div className="border rounded-md max-w-md w-full px-4 py-3 ">
              <div className="flex items-center justify-between ">
                <h3 className="text-gray-700 font-medium">
                  TOTAL ITEMS ({quantity})
                </h3>
                {/* <span className="text-gray-600 text-sm">Edit</span> */}
              </div>

              {carts?.length > 0 ? (
                carts.map((product) => {
                  return (
                    <div
                      className="flex justify-between mt-6  "
                      key={product?._id}
                    >
                      <div className="flex">
                        <img
                          className="h-20 w-20 object-cover rounded"
                          src={BASE_URL.concat(product?.image)}
                          alt=""
                        />
                        <div className="mx-3">
                          <h3 className="text-sm text-gray-600">
                            {product?.name}
                          </h3>
                          <div className="flex items-center mt-2">
                            <button
                              className="text-gray-500 focus:outline-none focus:text-gray-600"
                              onClick={() => {
                                // console.log("clicked");
                                dispatch(increaseQuantity(product));
                              }}
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                            <span className="text-gray-700 mx-2">
                              {product?.quantity}
                            </span>
                            <button
                              className="text-gray-500 focus:outline-none focus:text-gray-600"
                              onClick={() => {
                                // console.log("clicked");
                                dispatch(decreaseQuantity(product)); // Assuming you have a decreaseQuantity action
                              }}
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-600 ">
                        $ {product?.price * product?.quantity}
                      </span>
                      <button
                        className="text-gray-500 focus:outline-none focus:text-gray-600 "
                        onClick={() => {
                          dispatch(removeCart(product?._id));
                        }}
                      >
                        <svg
                          className="h-10 w-10 p-2  border rounded border-red-800 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-4 border  text-center mt-2">
                  No product found.{" "}
                  <Link to="/products" className="text-red-500">
                    Add Products
                  </Link>{" "}
                </div>
              )}
              <div className="border p-4 fw-bold text-center">
                <h4>Total: $ {totalPrice}</h4>
              </div>
              <div className="border p-4 fw-bold text-center">
                <button
                  onClick={placeOrder}
                  className=" border mx-4 sm:mx-2 py-1 px-4 bg-gradient-to-r from-cyan-400 to-sky-500 text-white"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
