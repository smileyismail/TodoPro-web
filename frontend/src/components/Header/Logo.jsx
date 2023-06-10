import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import AddTaskIcon from "@mui/icons-material/AddTask";
import colors from "../../utils/colors";

const Logo = () => {
  return (
    <Box whiteSpace="nowrap">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          startIcon={<AddTaskIcon />}
          sx={{
            padding: 1,
            display: { xs: "none", sm: "flex" },
            color: colors.textDark,
            fontWeight: "bolder",
            fontSize: 18,
            ":hover": {
              bgcolor: colors.accentLight,
            },
          }}
        >
          TodoPro
        </Button>

        <IconButton
          sx={{ display: { xs: "flex", sm: "none" }, color: colors.textDark }}
        >
          <AddTaskIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default Logo;
