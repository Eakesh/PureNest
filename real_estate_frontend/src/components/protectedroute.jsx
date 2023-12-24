import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import fetcher from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/user/userSlice";
export default function ProtectedRoute() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    fetcher(
      "/api/auth/authenticate",
      "GET",
      { credentials: "include" },
      null
    ).then((res) => {
      if (res.status === 401) {
        dispatch(Logout());
      }
    });
  });
  return user ? <Navigate to="/" /> : <Outlet />;
}
