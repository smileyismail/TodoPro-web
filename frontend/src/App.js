import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import colors from "./utils/colors";

//general imports
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
//auth pages import
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
//app pages import
import TodosPage from "./pages/TodosPage";
// other pages import
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const userId = useSelector((state) => state.authStore.userId);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (userId) {
  //     navigate("/app");
  //   }
  // }, [userId]);

  return (
    <Box bgcolor={colors.primary} sx={{ minHeight: "100vh" }}>
      <Header userId={userId} />

      <Routes>
        <Route path="/" element={<Home userId={userId} />} />

        {/* auth routes */}
        {userId ? (
          <Route path="app">
            <Route path="todos" element={<TodosPage />} />
            <Route path="/app" element={<Navigate to="todos" />} />
          </Route>
        ) : (
          <Route path="auth">
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="logIn" element={<LogInPage />} />
            <Route path="/auth" element={<Navigate to="logIn" />} />
          </Route>
        )}

        {/* app routes */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
};

export default App;
