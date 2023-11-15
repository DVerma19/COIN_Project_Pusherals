import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./components/ProTip";
import Card from "./components/Card";
import MapWithDraw from "./components/MapWithDraw";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" paddingTop="30px"> 
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Pusherals
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <AppBar color="success">
        <Toolbar>
          <Typography variant="h6" component="div">
            AgroInsure
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ my: 4, mt: 12 }}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Pusherals - Dashboard
        </Typography>
        <ProTip />
        <Card>
            <MapWithDraw/>
        </Card>
        <Copyright />
      </Box>
    </Container>
  );
}
