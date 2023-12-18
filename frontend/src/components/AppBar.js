import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

function getUsername() {
  try {
    // Read user info from local storage
    const userInfo = JSON.parse(localStorage.getItem('pusheralsUser'));
    console.log("userinfo: ", userInfo)
    // Assuming the user info includes a field called 'firstName'
    return userInfo?.firstName || 'Guest';
  } catch (error) {
    console.error('Error parsing user info:', error);
    return 'Guest';
  }
}

function CustomAppBar() {
  const navigate = useNavigate();

  function logout() {
    // Remove user info and token from local storage
    localStorage.removeItem('pusheralsUser');
    localStorage.removeItem('pusheralsToken');

    navigate('/signin');
  }

  return (
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
  );
}

export default CustomAppBar;
