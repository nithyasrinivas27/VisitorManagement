import React, { useState } from "react";
import "./Navbar.css"; // External CSS file for styling
import ApprovedVisitorsExcel from "../DownloadExcel/ApprovedVisitorsExcel";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use named import
import SignOutButton from "../SignOutButton/SignOutButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the menu toggle
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = jwtDecode(token);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              className="h-12"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              GuestFlow
            </span>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen} // Change based on state
            onClick={handleMenuToggle} // Add onClick event handler
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`} // Conditional class toggle
            id="navbar-default"
          >
            <ul className="font-medium items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <div className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                  <ApprovedVisitorsExcel />
                </div>
              </li>
              <li>
                <div className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                  {user.role === "Security" ? (
                    <button
                      className="add-visitor-btn"
                      onClick={() => navigate("/add-visitor")}
                    >
                      + Add Visitor
                    </button>
                  ) : null}
                </div>
              </li>
              <li>
                <div className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                  <SignOutButton />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
