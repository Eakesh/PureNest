import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import fetcher, { emailRegex, passwordRegex } from "../utils/utils";
import Loading from "../components/loading";

export default function Signin() {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [userdetails, setuserdetails] = useState({
    email: "",
    password: "",
  });
  const togglePasswordVisibility = () => {
    setshowpassword(!showpassword);
  };
  const changeHandler = (event) => {
    seterror("");
    setuserdetails((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const onSigninFormSubmit = async (event) => {
    event.preventDefault();
    if (userdetails.email.match(emailRegex)) {
      if (
        userdetails.password.match(passwordRegex) &&
        userdetails.password.length >= 8
      ) {
        setloading(true);
        const res = await fetcher("/api/auth/signin", "POST", null, {
          email: userdetails.email,
          password: userdetails.password,
        });
        const data = await res.json();
        if (data) {
          setloading(false);
        }
        if (res.status === 200) {
          navigate("/");
        } else if (res.status === 404) {
          seterror("User not found");
        } else if (res.status === 401) {
          seterror("Invalid Credentials");
        }
      } else {
        seterror("Invalid Credentials");
      }
    } else {
      seterror("please enter a valid email");
    }
  };
  return (
    <div className="flex w-full items-center justify-center my-8">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-5/6 max-w-[700px] md:px-10 px-6 py-8 rounded-3xl shadow-lg bg-white border-2 border-gray-100">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="font-medium text-md text-gray-500 mt-2">
            Welcome back! Please enter you details.
          </p>
          <form className="mt-4" method="post" onSubmit={onSigninFormSubmit}>
            <div className="flex flex-col">
              <label
                className="md:text-base ml-1 text-sm font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={changeHandler}
                name="email"
                type="email"
                className="w-full border-2 border-gray-100 focus:outline-none hover:border-black rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                className="md:text-base ml-1 text-sm font-semibold"
                htmlFor="password"
              >
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
                disabled={loading}
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-2 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                {loading ? <Loading /> : "Sign In"}
              </button>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <p className="md:text-base ml-1 text-sm font-semibold">
                Don't have an account?
              </p>
              <Link to={"/signup"}>
                <button className=" md:ml-2 md:text-base ml-1 text-sm font-semibold text-violet-500">
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
