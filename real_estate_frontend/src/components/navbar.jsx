import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-md sm:text-xl flex flex-wrap">
            <span className="text-blue-800">Pure</span>
            <span className="text-slate-800">Nest</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 flex items-center rounded-lg w-24 sm:w-64 md:justify-around">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none"
          />
          <FaSearch className="text-black cursor-pointer" />
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden md:inline text-slate-800 hover:underline">
              {" "}
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden md:inline text-slate-800 hover:underline">
              {" "}
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to={"/Profile"}>
              <li className=" text-slate-800 hover:underline">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />  
              </li>
            </Link>
          ) : (
            <Link to={"/signin"}>
              <li className=" text-slate-800 hover:underline"> SignIn</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
