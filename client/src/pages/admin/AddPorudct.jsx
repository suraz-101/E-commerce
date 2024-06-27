import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategories } from "../../slice/categorySlice";

export const AddProduct = () => {
  const dispatch = useDispatch();

  const { categories, page, limit, total } = useSelector(
    (state) => state.categories
  );

  const initFetch = useCallback(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  console.log(
    "categories",
    categories?.map((category) => {
      return category?.name;
    })
  );

  const [preview, setPreview] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const [payload, setPayload] = useState({});

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const categories = [
  //   "Electronics",
  //   "Apparel",
  //   "Books",
  //   "Home & Kitchen",
  //   "Other",
  // ];

  return (
    <div className="container">
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <Link to="/admin/products">
              <div className="absolute top-5 right-10 py-1 px-2 bg-sky-500 text-white transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                X
              </div>
            </Link>
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Add Product</h1>
              </div>
              <div className="flex justify-center ">
                {preview ? (
                  <img src={preview} alt="" height="150px" width="150px" />
                ) : (
                  <></>
                )}
              </div>
              <form action="">
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="image"
                        name="image"
                        type="file"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Product Image"
                        onChange={handleFile}
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Product Image
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="productName"
                        name="productName"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Product Name"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Product Name
                      </label>
                    </div>
                    <div className="relative">
                      <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        className="peer placeholder-transparent w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Product Description"
                      ></textarea>
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Product Description
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((prev) => Math.max(0, prev - 1))
                        }
                        className="bg-gray-200 text-gray-700 rounded-l px-2 py-1"
                      >
                        -
                      </button>
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 text-center focus:outline-none focus:borer-rose-600"
                        placeholder="Stock Quantity"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="bg-gray-200 text-gray-700 rounded-r px-2 py-1"
                      >
                        +
                      </button>
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Stock Quantity
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          setPrice((prev) => Math.max(0, prev - 1))
                        }
                        className="bg-gray-200 text-gray-700 rounded-l px-2 py-1"
                      >
                        -
                      </button>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 text-center focus:outline-none focus:borer-rose-600"
                        placeholder="Price"
                      />
                      <button
                        type="button"
                        onClick={() => setPrice((prev) => prev + 1)}
                        className="bg-gray-200 text-gray-700 rounded-r px-2 py-1"
                      >
                        +
                      </button>
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Price
                      </label>
                    </div>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {categories?.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Category
                      </label>
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
    </div>
  );
};
