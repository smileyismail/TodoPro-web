import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/Auth/AuthForm";

import { logInUser } from "../utils/authHttp";
import { authSliceActions } from "../store/authSlice";

const LogInPage = () => {
  //State variables
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redux store variables
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //LogIn Handler
  async function submitHandler(credentials) {
    const { email, password } = credentials;
    setIsLoading(true);
    setServerError("");
    try {
      const userId = await logInUser(email, password);
      dispatch(authSliceActions.authenticate({ userId: userId }));
      navigate("/app/todos");
    } catch (err) {
      if (err.code === "ERR_BAD_REQUEST") {
        setServerError("Invalid Email or Password");
      } else {
        setServerError("An error occurred during sign-up. Please try again.");
      }
      setIsLoading(false);
    }
  }

  return (
    <AuthForm
      isLogin
      onSubmit={submitHandler}
      serverError={serverError}
      isLoading={isLoading}
    />
  );
};

export default LogInPage;
