import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signin() {
  const [showpassword, setshowpassword] = useState(false);
  const [error, seterror] = useState("");
  const [userdetails, setuserdetails] = useState({
    email: "",
    password: "",
  });
  const togglePasswordVisibility = () => {
    setshowpassword(!showpassword);
  };
  const changeHandler = (event) => {
    setuserdetails((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const onSigninFormSubmit = (event) => {
    event.preventDefault();
    console.log(userdetails.email, userdetails.password);
  };
  return (
    <div className="flex w-full items-center justify-center my-8">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-5/6 max-w-[700px] px-10 py-10 rounded-3xl shadow-lg bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <p className="font-medium text-lg text-gray-500 mt-2">
            Welcome back! Please enter you details.
          </p>
          <form className="mt-4" method="post" onSubmit={onSigninFormSubmit}>
            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="email">
                Email
              </label>
              <input
                onChange={changeHandler}
                name="email"
                type="email"
                className="w-full border-2 border-gray-100 focus:outline-none hover:border-black rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium" htmlFor="password">
                Password
              </label>
              <div
                tabIndex="0"
                className="flex flex-row items-center hover:border-black mt-1 rounded-xl border-gray-100 border-2"
              >
                <input
                  onChange={changeHandler}
                  name="password"
                  className="w-full rounded-xl p-4 outline-none password-eye-remove bg-transparent"
                  placeholder="Enter your password"
                  type={showpassword ? "text" : "password"}
                  required
                />
                <span className="p-2" onClick={togglePasswordVisibility}>
                  {showpassword ? "🔒" : "👁️"}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-end items-center">
              <button className="font-medium text-base text-violet-500">
                Forgot password ?
              </button>
            </div>
            <div className="text-red-600">{error}</div>
            <div className="mt-4 flex flex-col gap-y-4">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-2 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                Sign in
              </button>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <Link to={"/signup"}>
                <button className="ml-2 font-medium text-base text-violet-500">
                  Sign up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
