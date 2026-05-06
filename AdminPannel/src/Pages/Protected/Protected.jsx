// ================= PROTECTED.JSX =================

import React from "react";

import { Navigate } from "react-router-dom";

const Protected = ({
  children,
}) => {
  // CHECK TOKEN
  const token =
    localStorage.getItem(
      "adminToken"
    );

  // NOT LOGGED IN
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // LOGGED IN
  return children;
};

export default Protected;