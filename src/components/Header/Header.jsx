import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import MainMenu from './MainMenu';
import SearchLayout from './Search/SearchLayout';
import SearchAutocomplete from './Search/SearchAutocomplete';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Header() {
  const [auth, setAuth] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAuthMenu = () => {
    setAuth(false);
  }

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <AppBar position="static" className="primary-dark">
      <Toolbar disableGutters variant="dense">
        <MainMenu />
        <Typography variant="p" noWrap component="div" sx={{ flexGrow: 1 }}>
          INNRAN532 - PodcastApp
        </Typography>
        
        {/* <SearchLayout data={settings} /> */}
        <SearchAutocomplete />

        {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="user-menu-appbar"
                aria-haspopup="true"
                onClick={handleAuthMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
              ))}
              </Menu>
            </div>
          )
        :
          (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              onClick={handleAuthMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )
        }

      </Toolbar>
    </AppBar>
  );
}

export default Header;
