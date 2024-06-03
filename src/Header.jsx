import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

function Header() {
  return (
    <AppBar
      position="static"
      className="primary-dark"
    >
      <Toolbar disableGutters variant="dense">
        <IconButton
          size="large"
          aria-label="open drawer"
          color="inherit"
          edge="start"
          sx={{ ml: 2 }}
        //   sx={{ mr: 2, display: { sm: 'none' } }} // Hide menu button on small screens
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="p"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          DJS11 - Podcast App
        </Typography>
        <Badge
        //   badgeContent={4}
          color="secondary"
        >
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <SearchIcon />
          </IconButton>
        </Badge>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
