import React from "react";
import { Link } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <>
      <aside className="relative bg-gray-800 w-64 hidden sm:block shadow-xl min-h-screen h-auto">
        <div className="p-6">
          <a
            href="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
          <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i className="fa fa-plus mr-3 text-sky-500"></i> New Report
          </button>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <a
            href="index.html"
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
          >
            <i className="fa fa-tachometer mr-3 text-sky-500"></i>
            Dashboard
          </a>
          <Link
            to="/admin/usersLists"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fa fa-sticky-note mr-3 text-sky-500"></i>
            Users
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fa fa-table mr-3 text-sky-500"></i>
            Products
          </Link>
          <a
            href="forms.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fa fa-align-left mr-3 text-sky-500"></i>
            Forms
          </a>
          <a
            href="tabs.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fa fa-table mr-3 text-sky-500"></i>
            Tabbed Content
          </a>
          <a
            href="calendar.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fa fa-calendar mr-3 text-sky-500"></i>
            Calendar
          </a>
        </nav>
        <a
          href="#"
          className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4"
        >
          <i className="fa fa-arrow-circle-up mr-3 text-sky-500"></i>
          Upgrade to Pro!
        </a>
      </aside>
    </>
  );
};
