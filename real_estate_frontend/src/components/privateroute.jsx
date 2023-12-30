import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/user/userSlice";
import fetcher from "../utils/utils";
import Navbar from "./navbar";
export default function PrivateRoute() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    fetcher(
      "/api/auth/authenticate",
      "GET",
      { credentials: "include" },
      null
    ).then((res) => {
      if (res.status !== 200) {
        dispatch(Logout());
      }
    });
  }, []);
  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" />
  );
}
