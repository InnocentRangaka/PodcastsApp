import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material/styles';
// import { darkTheme } from '../Theme';

const menuItems = ['Home', 'Seasons', 'Favourites', 'Contact', 'Settings'];

function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme(); // Access the current theme
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        // theme={darkTheme}
      >
        {menuItems.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MainMenu;
