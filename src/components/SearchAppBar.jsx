import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CancelIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const SearchAppBar = ({ handleSearch, handleClear }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Autocomplete
            id="search-autocomplete"
            freeSolo
            fullWidth
            disableClearable
            onChange={handleSearch}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search podcasts"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon />,
                  endAdornment: (
                    <CancelIconWrapper onClick={handleClear}>
                      <CancelIcon />
                    </CancelIconWrapper>
                  ),
                }}
              />
            )}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default SearchAppBar;
