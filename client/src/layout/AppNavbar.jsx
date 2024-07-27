import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/login";
import {
  currentUser,
  getCurrentUser,
  removeToken,
} from "../utils/sessionManager";
import ReactSwitch from "react-switch";
import { useContext } from "react";
import { toggleContext } from "../context/ToggleContext";
import { useDispatch } from "react-redux";
import { removeAll } from "../slice/cartSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../contants";

export const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeAll());
    removeToken("token");
    removeToken("currentUser");
    navigate("/");
  };
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  const { theme, setTheme } = useContext(toggleContext);

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const { quantity } = useSelector((state) => state.cart);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (isLoggedIn()) {
      const { name, email } = JSON.parse(getCurrentUser());
      setUserProfile({ name: name, email: email });
    }
  }, []);

  return (
    <>
      <header
        className="bg-backgroundColor transition-all"
        style={{ borderButtom: "1px solid gray" }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="hidden w-full text-secondaryColor md:flex md:items-center">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                  fill="currentColor"
                />
              </svg>
              <span className="mx-1 text-sm text-secondaryColor">PKR</span>
            </div>
            <div className="w-full text-primaryColor md:text-center text-2xl font-semibold">
              Brand
            </div>
            <div className="toggleButtonWrapper flex ">
              <ReactSwitch
                className="text-black bg-sky-900 dark:bg-gray-700 dark:text-white border border-gray"
                onChange={handleClick}
                checked={theme === "dark"}
                width={36} // This makes the switch smaller
                height={20} // This makes the switch smaller
              />
              <span className="ml-2 text-secondaryColor">{theme}Mode </span>
            </div>

            <div className="flex items-center justify-end w-full">
              {isLoggedIn() ? (
                <>
                  {" "}
                  <div className="flex mx-5 ">
                    <Link to="profile" className="flex mx-5  ">
                      {" "}
                      <i className="fa fa-user text-secondaryColor    flex justify-center  flex-col mx-2"></i>
                      <div className="flex flex-col text-secondaryColor ">
                        <h1> {userProfile?.name}</h1>
                        {/* <h1> {userProfile?.email}</h1> */}
                      </div>
                    </Link>
                  </div>
                  <button
                    className="  mx-4 sm:mx-2  px-4 py-1  text-secondaryColor hover:bg-slate-200 rounded hover:text-black flex justify-center align-middle"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="  mx-4 sm:mx-2  px-4 py-1  text-secondaryColor hover:bg-slate-200 rounded hover:text-black">
                      <i className="fa fa-user mx-2"></i> Login
                    </button>
                  </Link>
                  <div className="border h-4 border-secondaryColor"></div>
                  <Link to="/register">
                    <button className="mx-4 sm:mx-2  px-4 py-1 text-secondaryColor hover:bg-slate-200 rounded hover:text-black">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
              <Link to="/checkOut">
                <button className="text-secondaryColor focus:outline-none mx-4 sm:mx-0 ">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
              </Link>
              <Link to="/checkOut">
                <button className="text-secondaryColor focus:outline-none mx-4 sm:mx-0 relative">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {quantity}
                  </div>
                </button>
              </Link>

              <div className="flex sm:hidden ">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-900 "
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current ">
                    <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav className="sm:flex sm:justify-center sm:items-center mt-4">
            <div className="flex flex-col sm:flex-row">
              <Link
                to="/"
                className={`mt-3  hover:underline sm:mx-3 sm:mt-0 ${
                  path === "" ? "text-sky-500" : "text-secondaryColor"
                }`}
                href="#"
              >
                Home
              </Link>
              <Link
                to="products"
                className={`mt-3  hover:underline sm:mx-3 sm:mt-0 ${
                  path === "products" ? "text-sky-500" : "text-secondaryColor"
                }`}
                href="#"
              >
                Shop
              </Link>
              <Link
                // to="categori"
                className="mt-3 text-secondaryColor hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                Categories
              </Link>
              <Link
                className="mt-3 text-secondaryColor hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                Contact
              </Link>
              <Link
                className="mt-3 text-secondaryColor hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                About
              </Link>
              {isLoggedIn() ? (
                <Link
                  className="mt-3 text-secondaryColor hover:underline sm:mx-3 sm:mt-0"
                  to="orderHistory"
                >
                  Order History
                </Link>
              ) : (
                <></>
              )}
            </div>
          </nav>
          <div className="relative mt-6 max-w-lg mx-auto flex justify-evenly">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center  ">
              <svg
                className="h-5 w-5 text-secondaryColor  "
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                />
              </svg>
            </span>
            <input
              type="text"
              className="transition-all text-secondaryColor bg-secondaryBacgroundColor pl-10 block w-full rounded-md border-secondaryColor shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border py-1.5"
              placeholder="Search"
            />
          </div>
        </div>
      </header>
    </>
  );
};
