import React, { useRef } from 'react';
import { AppBar, Toolbar, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, alpha } from '@mui/material/styles';

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
  const inputRef = useRef(null); // Create a ref for focusing the input

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Search onClick={handleFocus}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Autocomplete
            id="search-autocomplete"
            freeSolo
            disableClearable
            onChange={(event, newValue) => handleSearch(event, newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef} // Assign inputRef to the TextField
                placeholder="Search podcasts"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon />,
                  endAdornment: (
                    <React.Fragment>
                      {params.inputProps.value && (
                        <CancelIconWrapper onClick={handleClear}>
                          <CancelIcon />
                        </CancelIconWrapper>
                      )}
                    </React.Fragment>
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
