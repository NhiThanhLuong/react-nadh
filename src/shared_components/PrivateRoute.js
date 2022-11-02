import { storage } from "_constants";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // const token = localStorage.getItem(storage.ACCESS_TOKEN);
  const token = localStorage.getItem(storage.token);
  return token ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
