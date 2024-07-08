import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../contants";
import { getAllOrders } from "../../slice/orderSlice";

export const OrderManagement = () => {
  const dispatch = useDispatch();
  const { usersOrder, orders } = useSelector((state) => state.orders);
  const [status, setStatus] = useState("");
  const initFetch = useCallback(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  return (
    <div className="bg-backgroundColor text-primaryColor transition-all">
      <div className="container mx-auto py-6 ">
        <h1 className="px-4 text-2xl font-bold"> Order History</h1>
        {orders?.length > 0 ? (
          orders?.map((order, index) => {
            return (
              <div className="container  p-5 mb-2 border" key={order?._id}>
                <h1>Order : {index + 1}</h1>
                <h1>Order By : {order?.customerName}</h1>
                <h1>Customer Email : {order?.customerEmail}</h1>
                <h1>Shipping Address : {order?.shippingAddress}</h1>

                {order?.items?.map((product, index) => {
                  return (
                    <div className=" p-2 flex" key={product?.productId}>
                      <div className="firstDiv p-4 border w-60">
                        <img
                          src={BASE_URL.concat(product?.image)}
                          alt=""
                          className="h-40 w-40"
                        />
                      </div>
                      <div className="secondaDiv px-10 py-4 border w-full">
                        <div className="flex justify-between">
                          <h2>{product?.productName}</h2>
                          <h2>${product?.price}</h2>
                        </div>
                        <p className="mt-4">{product?.description}</p>
                        <div className="mt-5 flex justify-between">
                          <h2 className="mt-5">
                            SubTotal : $ {product?.subtotal}
                          </h2>
                          <h2 className="mt-5">
                            Qunatity Ordered : {product?.quantity}
                          </h2>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <h1 className="py-2">
                  Status :{" "}
                  <span
                    className={`${
                      order?.orderStatus === "pending"
                        ? "text-red-600"
                        : "text-green-500"
                    }`}
                  >
                    {order?.orderStatus}
                  </span>
                </h1>
                <label htmlFor="">Change Status : </label>
                <select
                  name="status"
                  id="status"
                  className="border-2 border-gray-400 px-2 py-1 "
                >
                  <option value="">pending</option>
                  <option value="">processing</option>
                  <option value="">Completed</option>
                  <option value="">canceled</option>
                </select>

                <h1>
                  Payment Method :{" "}
                  <span
                    className={`${
                      order?.paymentMethod === "pending"
                        ? "text-red-600"
                        : "text-green-500"
                    }`}
                  >
                    {order?.paymentMethod}
                  </span>
                </h1>
              </div>
            );
          })
        ) : (
          <>No Order History</>
        )}
      </div>
    </div>
  );
};
