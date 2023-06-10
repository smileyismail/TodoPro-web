import * as React from "react";
import { Box, AppBar, Toolbar, Container } from "@mui/material";

import Logo from "./Logo";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

import colors from "../../utils/colors";

function Header(props) {
  const { userId } = props;

  return (
    <AppBar position="fixed" sx={{ bgcolor: colors.secondary }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Logo />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {userId ? <LoggedInNav userId={userId} /> : <LoggedOutNav />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
