import React from "react";
import { Typography, Button, Box } from "@mui/material";
import Lottie from "lottie-react";

import { Link } from "react-router-dom";

import tasks from "../../assets/homeGif.json";

import colors from "../../utils/colors";

const Home = (props) => {
  const { userId } = props;
  return (
    <Box
      sx={{
        maxWidth: { xs: "90vw", md: "80vw" },
        marginX: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        paddingTop: { xs: 20, md: 0 },
        justifyContent: "space-between",
        textAlign: { xs: "center", md: "start" },
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          maxWidth: 600,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "medium" }}>
          Take Control of Your{" "}
          <Typography
            variant="h2"
            component="span"
            sx={{ color: colors.accentDark, fontWeight: "medium" }}
          >
            Tasks
          </Typography>
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "medium" }}>
          Stay organized and get things done with our powerful todo app.
        </Typography>

        <Link to={userId ? "/app/todos" : "/auth/signUp"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: colors.accentDark,
              fontSize: 18,
              fontWeight: "bold",
              color: colors.textLight,
              ":hover": {
                bgcolor: colors.accentLight,
              },
            }}
          >
            {userId ? "Go to App" : " Get Started"}
          </Button>
        </Link>
      </Box>

      <Box>
        <Lottie animationData={tasks} loop={true} />
      </Box>
    </Box>
  );
};

export default Home;
