import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import fetcher from "../utils/utils";

export default function ProtectedRoute() {
  console.log("hello bro");
  const [isAuthenticated, setisAuthenticated] = useState(null);
  useEffect(() => {
    fetcher(
      "/api/auth/authenticate",
      "GET",
      { credentials: "include" },
      null
    ).then((res) => {
      if (res.status === 200) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
    });
  }, []);
  return isAuthenticated !== null && isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
}
