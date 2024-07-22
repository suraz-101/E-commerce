import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../contants";
import {
  decreaseQuantity,
  increaseQuantity,
  removeAll,
  removeCart,
} from "../slice/cartSlice";
import { createNewOrder } from "../slice/orderSlice";
import { getSingleUser } from "../slice/userSlice";
import { currentUser, getCurrentUser } from "../utils/sessionManager";
import { isLoggedIn } from "../utils/login";
import { Notify } from "../components/Notify";
import { updateProductQuantity } from "../slice/productSlice";
import { invoiceGenerator } from "../utils/services/invoiceGenerator";
import { paymentComplete } from "../slice/orderSlice";
import esewa from "../assets/esewaLogo.png";

export const CheckOut = () => {
  const dispatch = useDispatch();
  const { carts, quantity } = useSelector((state) => state.cart);
  const { users, user } = useSelector((state) => state.users);
  const { message, error, result } = useSelector((state) => state.orders);
  const [disable, setDisable] = useState(false);

  const initFetch = useCallback(
    (email) => {
      dispatch(getSingleUser(email));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isLoggedIn()) {
      const { name, email } = JSON.parse(getCurrentUser());
      initFetch(email);
    }
  }, [initFetch]);

  const [payload, setPayload] = useState({
    customerId: null,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: null,
    paymentMethod: "esewa",
    paymentStatus: "pending",
    items: [],
    totalPrice: 0,
  });

  // const [payment, setPayment] = useState({
  //   amount: "",
  //   failure_url: "https://google.com",
  //   product_delivery_charge: "0",
  //   product_service_charge: "0",
  //   product_code: "EPAYTEST",
  //   signature: "",
  //   signed_field_names: "",
  //   success_url: "https://esewa.com.np",
  //   tax_amount: "10",
  //   total_amount: "",
  //   transaction_uuid: "",
  // });

  const placeOrder = async (e) => {
    e.preventDefault();
    const updatedPayload = {
      ...payload,
      items: carts.map((cartItem) => ({
        productId: cartItem._id,
        productName: cartItem.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
        subtotal: cartItem.price * cartItem.quantity,
        image: cartItem.image[0],
        description: cartItem.description,
      })),
      totalPrice: calculateTotalPrice(),
      orderStatus: "pending",
      customerId: user?._id,
      customerName: user?.name,
      customerEmail: user?.email,
      customerPhone: user?.phoneNumber,
    };

    setPayload(updatedPayload);
    console.log("payload", updatedPayload);

    if (quantity !== 0) {
      dispatch(createNewOrder(updatedPayload));
    } else {
      alert("Add product to cart");
      return;
    }

    carts.map((cartItem) => {
      dispatch(
        updateProductQuantity({
          id: cartItem?._id,
          stockQuantity: cartItem?.stockQuantity - cartItem?.quantity,
        })
      );
    });

    if (message) {
      console.log("We are inside");
      invoiceGenerator(
        user?.name,
        Date.now(),
        updatedPayload?.items,
        payload.shippingAddress
      );
    }
  };

  const calculateTotalPrice = () => {
    return carts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  console.log("carts", carts);
  return (
    <div className="bg-backgroundColor text-primaryColor transition-all">
      <div className="container mx-auto py-6">
        <h3 className="text-gray-700 text-2xl font-medium text-primaryColor">
          Checkout
        </h3>
        <div className="flex flex-col lg:flex-row mt-8">
          <div className="w-full lg:w-1/2 order-2">
            <div className="flex items-center"></div>
            <div className="">
              <h3 className="font-bold text-lg py-2">
                For test use following details
              </h3>
              <b>eSewa ID:</b> 9806800001/2/3/4/5 <br />
              <b>Password:</b> Nepal@123
              <br />
              <b>MPIN:</b> 1122 <br />
              <b>Token:</b>123456
            </div>
            <form
              action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
              method="POST"
              target="_blank"
            >
              <br />
              <br />
              <table>
                <tbody>
                  <tr>
                    <td>Amount:</td>
                    <td>
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={payload?.totalPrice}
                        className="form border"
                        required=""
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>Tax Amount:</td>
                    <td>
                      <input
                        type="text"
                        id="tax_amount"
                        name="tax_amount"
                        value="0"
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Amount:</td>
                    <td>
                      <input
                        type="text"
                        id="total_amount"
                        name="total_amount"
                        value={payload?.totalPrice}
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        id="transaction_uuid"
                        name="transaction_uuid"
                        value={result?.order?._id}
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        id="product_code"
                        name="product_code"
                        value="EPAYTEST"
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Product Service Charge:</td>
                    <td>
                      <input
                        type="text"
                        id="product_service_charge"
                        name="product_service_charge"
                        value="0"
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Product Delivery Charge:</td>
                    <td>
                      <input
                        type="text"
                        id="product_delivery_charge"
                        name="product_delivery_charge"
                        value="0"
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        id="success_url"
                        name="success_url"
                        value="http://localhost:8000/api/v1/orders/complete-payment"
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        id="failure_url"
                        name="failure_url"
                        value="https://developer.esewa.com.np/failure"
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        id="signed_field_names"
                        name="signed_field_names"
                        value={result?.payment?.signed_field_names}
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        id="signature"
                        name="signature"
                        value={result?.payment?.signature}
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="hidden"
                        id="secret"
                        name="secret"
                        value="8gBm/:&EnhH.1/q"
                        className="form"
                        required=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex ">
                <input
                  value=" Pay with eSewa  "
                  type="submit"
                  className="button bg-green-600 text-white rounded px-2 shadow-inner font-bold "
                  onClick={(e) => {
                    dispatch(removeAll());
                  }}
                />
                <img
                  src={esewa}
                  alt=""
                  style={{ height: "50px", width: "50px" }}
                />
              </div>
            </form>
          </div>
          <div className="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2 ">
            <div className="flex justify-center lg:justify-end ">
              <div className="border rounded-md max-w-md w-full px-4 py-3 ">
                <div className="flex items-center justify-between ">
                  <h3 className="text-primaryColor font-medium">
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
                            <h3 className="text-sm text-secondaryColor">
                              {product?.name}
                            </h3>
                            <div className="flex items-center mt-2">
                              <button
                                className="text-secondaryColor focus:outline-none focus:text-gray-700"
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
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                              </button>
                              <span className="text-secondaryColor mx-2">
                                {product?.quantity}
                              </span>
                              <button
                                className="text-secondaryColor focus:outline-none focus:text-gray-600"
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
                        <span className="text-secondaryColor">
                          $ {product?.price * product?.quantity}
                        </span>
                        <button
                          className="text-red-700 focus:outline-none focus:text-gray-600 "
                          onClick={() => {
                            dispatch(removeCart(product?._id));
                          }}
                        >
                          <svg
                            className="h-10 w-10 p-2  border rounded border-red-700 "
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
                  <div className="py-4 border text-secondaryColor text-center mt-2">
                    No product found.{" "}
                    <Link to="/products" className="text-red-500">
                      Add Products
                    </Link>{" "}
                  </div>
                )}
                <div className=" p-4 fw-bold text-center text-secondaryColor">
                  <h4>Total: $ {totalPrice}</h4>
                </div>
                <div className=" p-4 fw-bold text-center text-secondaryColor">
                  {(error || message) && (
                    <div
                      className={`${error ? "text-red-600" : "text-green-500"}`}
                    >
                      {" "}
                      <Notify
                        variant={error ? "danger" : "success"}
                        msg={error || message}
                      />
                    </div>
                  )}
                </div>

                <div className=" p-4 fw-bold text-center">
                  {isLoggedIn() ? (
                    <>
                      <div>
                        <form>
                          <select
                            name="shippingAddress"
                            id="shippingAddress"
                            className="border w-full"
                            value={payload?.shippingAddress || ""}
                            onChange={(e) => {
                              setPayload((prev) => ({
                                ...prev,
                                shippingAddress: e.target.value,
                              }));
                              // getCategory(e.target.value);
                            }}
                            required
                          >
                            <option value="">select address</option>
                            {user?.address?.map((add, index) => {
                              return (
                                <option value={add} key={index}>
                                  {add}
                                </option>
                              );
                            })}
                          </select>
                          <button
                            onClick={(e) => {
                              placeOrder(e);
                            }}
                            className=" border mx-4 my-4 sm:mx-2 py-1 px-4 bg-gradient-to-r from-green-400 to-green-500 text-white"
                          >
                            Check Out
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {/* <button
                    onClick={proceedPayment}
                    className=" border mx-4 my-4 sm:mx-2 py-1 px-4 bg-gradient-to-r from-green-400 to-green-500 text-white"
                  >
                    procedd
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
