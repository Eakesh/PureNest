import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetcher, { emailRegex, passwordRegex } from "../utils/utils";
import Loading from "../components/loading";

export default function Signup() {
  const navigate = useNavigate();
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [error, seterror] = useState("");
  const [userdetails, setuserdetails] = useState({});
  const [loading, setloading] = useState(false);
  const togglePasswordVisibility = () => {
    setshowpassword(!showpassword);
  };
  const toggleconfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };
  const changeHandler = (event) => {
    seterror("");
    setuserdetails((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const onSignupFormSubmit = async (event) => {
    event.preventDefault();
    if (userdetails.email.match(emailRegex)) {
      if (userdetails.password === userdetails.confirmpassword) {
        if (userdetails.password.match(passwordRegex)) {
          if (userdetails.password.length >= 8) {
            setloading(true);
            const res = await fetcher("/api/auth/signup", "POST", null, {
              username: userdetails.username,
              email: userdetails.email,
              password: userdetails.password,
            });
            const data = await res.json();
            if (data) {
              setloading(false);
            }
            if (res.status === 403) {
              seterror(data.message);
            } else if (res.status === 422) {
              seterror("Can you please retry");
            } else {
              navigate("/signin");
            }
          } else {
            seterror("Password should have ateast 8 characters");
          }
        } else {
          seterror(
            "Password must contain uppercase,lowercase,number and special character"
          );
        }
      } else {
        seterror("Password doesn't match");
      }
    } else {
      seterror("Enter a valid email");
    }
  };
  return (
    <div className="flex w-full items-center justify-center my-24">
      <div className="w-full flex items-center justify-center">
        <div className=" w-5/6 max-w-[700px] md:px-10 px-6 py-8 rounded-3xl shadow-lg bg-white border-2 border-gray-100">
          <h1 className="text-3xl font-semibold">Welcome</h1>
          <div className="font-medium text-md text-gray-500 md:mt-2 mt-1 flex flex-row flex-wrap">
            <p>Get Started with</p>
            <p className="font-bold mx-1 flex">
              <span className="text-blue-800">Pure</span>
              <span className="text-slate-800">Nest</span>
            </p>
            !
          </div>
          <form className="mt-4" method="post" onSubmit={onSignupFormSubmit}>
            <div className="flex flex-col">
              <label
                className="md:text-base ml-1 text-sm font-semibold"
                htmlFor="username"
              >
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
              <label
                className="md:text-base ml-1 text-sm font-semibold"
                htmlFor="email"
              >
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
                  name="password"
                  onChange={changeHandler}
                  className="w-full rounded-xl password-eye-remove p-4 outline-none bg-transparent"
                  placeholder="Enter your password"
                  type={showpassword ? "text" : "password"}
                  required
                />
                <span className="p-2" onClick={togglePasswordVisibility}>
                  {showpassword ? "👁️" : "🔒"}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="md:text-base ml-1 text-sm font-semibold"
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
              <div
                tabIndex="0"
                className="flex flex-row items-center hover:border-black mt-1 rounded-xl border-gray-100 border-2"
              >
                <input
                  name="confirmpassword"
                  onChange={changeHandler}
                  className="w-full rounded-xl p-4 password-eye-remove outline-none bg-transparent"
                  placeholder="Enter your password"
                  type={showconfirmPassword ? "text" : "password"}
                  required
                />
                <span className="p-2" onClick={toggleconfirmPasswordVisibility}>
                  {showconfirmPassword ? "👁️" : "🔒"}
                </span>
              </div>
            </div>
            <div className="text-red-500">{error}</div>
            <div className="mt-4 flex flex-col gap-y-4">
              <button
                disabled={loading}
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-2 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                {loading ? <Loading /> : "Sign up"}
              </button>
            </div>
            <div className="mt-4 flex justify-center items-center flex-row">
              <p className="md:text-base text-sm font-semibold">
                Already Having an account?
              </p>
              <Link to={"/signin"}>
                <button className="md:ml-2 ml-1  md:text-base text-sm font-semibold text-violet-500">
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
