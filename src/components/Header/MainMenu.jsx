import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import MenuIcon from '@mui/icons-material/Menu';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material/styles';

const menuItems = ['Home', 'Shows', 'Favourites', 'History'];

function MainMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme(); // Access the current theme
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setAnchorEl(null); // Close the menu
    switch (option) {
      case 'Home':
        navigate('/'); // Navigate to Home page
        break;
      case 'Shows':
        navigate('/show'); // Navigate to Shows page
        break;
      case 'Favourites':
        navigate('/favorites'); // Navigate to Favourites page
        break;
      case 'History':
        navigate('/history'); // Navigate to Favourites page
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-controls={open ? 'main-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="main menu"
        color="inherit"
        edge="start"
        sx={{ ml: 2 }}
      >
        <MenuIcon />
      </IconButton>
        <IconButton
          size="large"
          onClick={() => handleMenuItemClick("Home")}
          color="inherit"
          sx={{ padding: '8px' }}
        >
         <Avatar alt="App logo" src="../../../src/assets/images/android-chrome-192x192.png" sx={{ width: 32, height: 32 }} />
       </IconButton>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'main-menu-button',
        }}
        TransitionComponent={Fade}
      >
        {menuItems.map((option) => (
          <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MainMenu;
