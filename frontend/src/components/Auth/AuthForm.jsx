import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";

import colors from "../../utils/colors";

import { strengthColor, strengthIndicator } from "./passwordStrength";

const SignUp = ({ isLogin, serverError, onSubmit, isLoading }) => {
  // State variables
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [level, setLevel] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    passwordStrength("");
  }, []);

  // Event handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function passwordStrength(value) {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  }

  //validating the inputs
  function validate() {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!isLogin && values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      const credentials = {
        email: values.email,
        password: values.password,
      };
      onSubmit(credentials);
    }
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: "90vw", md: "80vw" },
        marginX: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        textAlign: { xs: "center", md: "start" },
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          bgcolor: "white",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" marginBottom={4}>
          {isLogin ? " Log In" : "Sign Up"}
        </Typography>

        {/* Email input */}
        <Box width="100%">
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={values.email}
            placeholder="john@example.com"
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <Typography color="red">{errors && errors.email}</Typography>
        </Box>

        {/* Password input */}
        <Box width="100%">
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={values.password}
            onChange={(e) => {
              handleChange(e);
              passwordStrength(e.target.value);
            }}
            sx={{ width: "100%" }}
          />
          <Typography color="red">{errors && errors.password}</Typography>
        </Box>

        {/* Password strength indicator */}
        {!isLogin && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
              gap: 1,
            }}
          >
            <Box
              bgcolor={level.color}
              width={100}
              height={5}
              borderRadius={10}
            />
            <Typography>{level.label}</Typography>
          </Box>
        )}

        {/* Confirm password input (only for sign up) */}
        {!isLogin && (
          <Box width="100%">
            <TextField
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
            <Typography color="red">
              {errors && errors.confirmPassword}
            </Typography>
          </Box>
        )}

        {/* Server error message */}
        {serverError && (
          <Typography color={colors.danger}>{serverError}</Typography>
        )}

        {/* Sign up or login link */}
        {isLogin ? (
          <Typography>
            Don't have an account?{" "}
            <Link to="/auth/signUp" style={{ textDecoration: "none" }}>
              <Typography component="span" color={colors.accentDark}>
                Sign Up
              </Typography>
            </Link>
          </Typography>
        ) : (
          <Typography>
            Already a user?{" "}
            <Link to="/auth/logIn" style={{ textDecoration: "none" }}>
              <Typography component="span" color={colors.accentDark}>
                Log In
              </Typography>
            </Link>
          </Typography>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: colors.accentDark,
            width: "100%",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textLight,
            ":hover": {
              bgcolor: colors.accentLight,
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={34} sx={{ color: colors.primary }} />
          ) : isLogin ? (
            " Log In"
          ) : (
            "Sign Up"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
