import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleCategory, listCategories } from "../../slice/categorySlice";
import { createNewProduct } from "../../slice/productSlice";
import { Notify } from "../../components/Notify";

export const AddProduct = () => {
  const dispatch = useDispatch();

  const { categories, category } = useSelector((state) => state.categories);
  const { error, message } = useSelector((state) => state.products);

  //code to list all category to display on drop down menu of form
  const initFetch = useCallback(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  // code for the preview of the image after selecting from the computer before upload
  const [preview, setPreview] = useState("");

  // payload that need to be send to the backend
  const [payload, setPayload] = useState({
    name: "",
    description: "",
    price: 0,
    category: null,
    stockQuantity: 0,
    image: null,
    colors: [""],
  });

  //code to handle the preview
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    //code to set the value of image filed of payload
    setPayload((prevVal) => ({
      ...prevVal,
      image: file,
    }));
  };

  //code to get Single Category detail of selected category name from dropdown menu
  const getCategory = async (name) => {
    await dispatch(getSingleCategory(name));
  };

  // after the category is updated afte dispatch setting the calue of category
  useEffect(() => {
    if (category?._id) {
      setPayload((prev) => ({
        ...prev,
        category: category._id,
      }));
    }
  }, [category]);

  // handling form submit which will help to create product
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewProduct(payload));
  };

  const handleColorChange = (index, e) => {
    const newColors = [...payload.colors]; // Create a copy of the colors array
    newColors[index] = e.target.value; // Modify the copied array
    setPayload({ ...payload, colors: newColors }); // Update the state with the new colors array
  };

  const addColorField = () => {
    setPayload({ ...payload, colors: [...payload.colors, ""] }); // Add an empty string to the colors array
  };

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
              <div className="flex justify-center">
                {preview ? (
                  <img src={preview} alt="" height="150px" width="150px" />
                ) : (
                  <></>
                )}
              </div>
              <form onSubmit={handleSubmit}>
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
                        value={payload?.name}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
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
                        value={payload?.description}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      ></textarea>
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Product Description
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <button
                        type="button"
                        onClick={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            stockQuantity: prev.stockQuantity - 1,
                          }))
                        }
                        className="bg-gray-200 text-gray-700 rounded-l px-2 py-1"
                      >
                        -
                      </button>
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={payload?.stockQuantity}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            stockQuantity: Number(e.target.value),
                          }))
                        }
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 text-center focus:outline-none focus:borer-rose-600"
                        placeholder="Stock Quantity"
                      />
                      <button
                        type="button"
                        onClick={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            stockQuantity: prev.stockQuantity + 1,
                          }))
                        }
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
                        onClick={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            price: prev.price - 1,
                          }))
                        }
                        className="bg-gray-200 text-gray-700 rounded-l px-2 py-1"
                      >
                        -
                      </button>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        value={payload?.price}
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            price: Number(e.target.value),
                          }))
                        }
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 text-center focus:outline-none focus:borer-rose-600"
                        placeholder="Price"
                      />
                      <button
                        type="button"
                        onClick={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            price: prev.price + 1,
                          }))
                        }
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
                        value={payload?.category || ""}
                        onChange={(e) => {
                          setPayload((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }));
                          getCategory(e.target.value);
                        }}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {categories?.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Category
                      </label>
                    </div>
                    <div className="relative flex items-center">
                      <div>
                        <label>Colors:</label>
                        {payload.colors.map((color, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              value={color}
                              onChange={(e) => handleColorChange(index, e)}
                              placeholder={`Color ${index + 1}`}
                            />
                          </div>
                        ))}
                        <button type="button" onClick={addColorField}>
                          Add Another Color
                        </button>
                      </div>
                    </div>

                    <div className="message">
                      {(error || message) && (
                        <div>
                          {
                            <Notify
                              variant={error ? "danger" : "success"}
                              msg={error || message}
                            />
                          }
                        </div>
                      )}
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

            {/* <div className="w-full flex justify-center">
              Already have an Account ?{" "}
              <span className="text-blue-500 mx-2">
                <Link to="/login">Sign in</Link>
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
