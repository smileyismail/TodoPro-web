import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import colors from "../utils/colors";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4">Page Not Found</Typography>
      <Link to="/">
        <Button
          variant="contained"
          sx={{
            bgcolor: colors.accentDark,
            fontSize: 18,
            color: colors.textLight,
            ":hover": {
              bgcolor: colors.accentLight,
            },
          }}
        >
          Go to Home Page
        </Button>
      </Link>
    </Box>
  );
};

export default NotFoundPage;
