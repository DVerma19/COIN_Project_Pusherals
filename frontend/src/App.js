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
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';


function getUsername() {
  try {
    // Read user info from local storage
    const userInfo = JSON.parse(localStorage.getItem('pusheralsUser'));
    console.log("userinfo: ", userInfo)
    // Assuming the user info includes a field called 'firstName'
    return userInfo?.firstName  || 'Guest';
  } catch (error) {
    console.error('Error parsing user info:', error);
    return 'Guest';
  }
}

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
  const navigate = useNavigate();


function logout() {
  // const navigate = useNavigate();
  // Remove user info and token from local storage
  localStorage.removeItem('pusheralsUser');
  localStorage.removeItem('pusheralsToken');

  navigate('/signin');
}

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <AppBar color="success">
        <Toolbar>
          <Typography variant="h6" component="div">
            AgroInsure
          </Typography>
          <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', marginLeft: '10px' }}>
              {/* Display the first letter of the username */}
              {getUsername().charAt(0)}
            </Avatar>
            <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
              {getUsername()}
            </Typography>
            <IconButton color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
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