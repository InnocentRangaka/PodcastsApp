import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

import { darkTheme, lightTheme } from './Theme';
import MainMenu from './components/MainMenu';

function Header() {
  return (
    <AppBar
      position="static"
      className="primary-dark"
      // theme={darkTheme}
    >
      <Toolbar disableGutters variant="dense">
        <MainMenu />
        <Typography
          variant="p"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          DJS11 - Podcast App
        </Typography>
        <Badge
          // badgeContent={4}
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
