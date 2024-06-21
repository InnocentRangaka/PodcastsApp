import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import MainMenu from './MainMenu';
import SearchLayout from './SearchLayout'; // Assuming SearchComponent is imported correctly

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <AppBar position="static" className="primary-dark">
      <Toolbar disableGutters variant="dense">
        <MainMenu />
        <Typography variant="p" noWrap component="div" sx={{ flexGrow: 1 }}>
          DJS11 - Podcast App
        </Typography>
        {!showSearch && (
          <Badge color="secondary">
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={toggleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Badge>
        )}
      </Toolbar>
      {showSearch && <SearchLayout />}
    </AppBar>
  );
}

export default Header;
