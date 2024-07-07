import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../contants";
import { getUserOrder } from "../slice/orderSlice";
import { getCurrentUser } from "../utils/sessionManager";

export const UsersOrderHistory = () => {
  const dispatch = useDispatch();
  const { usersOrder } = useSelector((state) => state.orders);

  const initFetch = useCallback(
    (email) => {
      dispatch(getUserOrder(email));
    },
    [dispatch]
  );

  useEffect(() => {
    const { email } = JSON.parse(getCurrentUser());
    initFetch(email);
  }, [initFetch]);

  console.log("usersOrder", usersOrder);

  return (
    <div className="bg-backgroundColor text-primaryColor">
      <div className="container mx-auto py-6">
        <h1 className="mb-6 font-bold text-3xl ">You Order History</h1>
        {usersOrder?.length > 0 ? (
          usersOrder?.map((order, index) => {
            return (
              <div className="container border p-5 mb-5" key={order?._id}>
                <h1>
                  {" "}
                  <span className="font-bold ">Order Number : </span>
                  {index + 1}
                </h1>
                {order?.items?.map((product, index) => {
                  return (
                    <div
                      className=" p-2 flex border-b mt-2"
                      key={product?.productId}
                    >
                      <div className="firstDiv p-4  w-60">
                        <img
                          src={BASE_URL.concat(product?.image)}
                          alt=""
                          className="h-40 w-40"
                        />
                      </div>
                      <div className="secondaDiv px-10 py-4  w-full">
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
                <h1 className="py-4">
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
