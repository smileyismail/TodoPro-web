import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import colors from "../../utils/colors";

const LoggedOutNav = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Link to="/auth/logIn">
        <Button
          variant="contained"
          sx={{
            fontSize: 16,
            bgcolor: colors.accentDark,
            paddingX: 2,
            color: colors.textLight,
            fontWeight: "bolder",
            ":hover": {
              bgcolor: colors.accentLight,
            },
          }}
        >
          Log In
        </Button>
      </Link>

      <Link to="/auth/signUp">
        <Button
          variant="contained"
          sx={{
            fontSize: 16,
            bgcolor: colors.accentDark,
            paddingX: 2,
            color: colors.textLight,
            fontWeight: "bolder",
            ":hover": {
              bgcolor: colors.accentLight,
            },
          }}
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );
};

export default LoggedOutNav;
