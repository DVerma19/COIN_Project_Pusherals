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
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = () => {
    // Add the link to the dashboard page
    navigate("/dashboard");
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    // Remove user info and token from local storage
    localStorage.removeItem("pusheralsUser");
    localStorage.removeItem("pusheralsToken");
    navigate("/signin");
    handleMenuClose();
  };

  return (
    <AppBar color="success">
      <Toolbar>
        {/* Use Link component for the home link */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" component="div">
            AgroInsure
          </Typography>
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {/* User icon button with dropdown menu */}
          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {/* Display the first letter of the username */}
              {getUsername().charAt(0)}
            </Avatar>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );

//   return (
//     <AppBar color="success">
//       <Toolbar>
//       <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>

//         <Typography variant="h6" component="div">
//           AgroInsure
//         </Typography>
//         </Link>
//         <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
//           <Avatar sx={{ bgcolor: 'primary.main', marginLeft: '10px' }}>
//             {/* Display the first letter of the username */}
//             {getUsername().charAt(0)}
//           </Avatar>
//           <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
//             {getUsername()}
//           </Typography>
//           <IconButton color="inherit" onClick={logout}>
//             <ExitToAppIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
}

export default CustomAppBar;
