import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [error, seterror] = useState("");
  const [userdetails, setuserdetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const togglePasswordVisibility = () => {
    setshowpassword(!showpassword);
  };
  const toggleconfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };
  const changeHandler = (event) => {
    setuserdetails((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const onSignupFormSubmit = (event) => {
    event.preventDefault();
    console.log(userdetails);
  };
  return (
    <div className="flex w-full items-center justify-center my-8">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-5/6 max-w-[700px] px-10 py-10 rounded-3xl shadow-lg bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Welcome</h1>
          <p className="font-medium text-lg text-gray-500 mt-2 flex flex-row flex-wrap">
            <p>Get Started with</p>
            <h1 className="font-bold mx-1 flex">
              <span className="text-blue-800">Pure</span>
              <span className="text-slate-800">Nest</span>
            </h1>
            !
          </p>
          <form className="mt-4" method="post" onSubmit={onSignupFormSubmit}>
            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="username">
                Username
              </label>
              <input
                name="username"
                onChange={changeHandler}
                className="w-full border-2 border-gray-100 focus:outline-none hover:border-black rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your username"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                onChange={changeHandler}
                className="w-full border-2 border-gray-100 hover:border-black focus:outline-none rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="password">
                Password
              </label>
              <div
                tabIndex="0"
                className="flex flex-row items-center hover:border-black mt-1 rounded-xl border-gray-100 border-2"
              >
                <input
                  name="password"
                  onChange={changeHandler}
                  className="w-full rounded-xl p-4 outline-none bg-transparent"
                  placeholder="Enter your password"
                  type={showpassword ? "text" : "password"}
                  required
                />
                <span className="p-2" onClick={togglePasswordVisibility}>
                  {showpassword ? "🔒" : "👁️"}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="confirmpassword">
                Confirm Password
              </label>
              <div
                tabIndex="0"
                className="flex flex-row items-center hover:border-black mt-1 rounded-xl border-gray-100 border-2"
              >
                <input
                  name="confirmpassword"
                  onChange={changeHandler}
                  className="w-full rounded-xl p-4 outline-none bg-transparent"
                  placeholder="Enter your password"
                  type={showconfirmPassword ? "text" : "password"}
                  required
                />
                <span className="p-2" onClick={toggleconfirmPasswordVisibility}>
                  {showconfirmPassword ? "🔒" : "👁️"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-2 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                Sign up
              </button>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <p className="font-medium text-base">
                Already Having an account?
              </p>
              <Link to={"/signin"}>
                <button className="ml-2 font-medium text-base text-violet-500">
                  Sign In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
