import React, { useState, useRef  } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import InputAdornment from '@mui/material/InputAdornment';

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
  padding: theme.spacing(0, 2, 0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Listbox = styled('ul')(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  margin: 0,
  padding: 0,
  zIndex: 10,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: alpha(theme.palette.common.black, 1),
  maxHeight: 320,
  transition: theme.transitions.create('height'),
  overflow: 'auto',
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

function SearchLayout({data}) {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null); // Create a ref for focusing the input

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearch = () => {
    if (inputRef.current) {
      // inputRef.current.focus();
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'autocomplete-search',
    options: data, /* top100Films, */
    ariaLabel: 'autocomplete-search-input',
    getOptionLabel: (option) => option /*.title */,
    renderInput: (params) => (
      <StyledInputBase
        {...params}
        inputRef={inputRef} // Assign inputRef to the TextField
        inputProps= {
          { 'aria-label': 'search'}
        }
      />
    )
  });

  const inputProps = {...getInputProps()}
  const inputPropsValue = inputProps.value
  
  // onChange={(event, newValue) => handleSearch(event, newValue)}

  return (
    showSearch ? 
    (
      <Search  {...getRootProps()}>
        <StyledInputBase {...inputProps} variant="standard"
          label="Size small"
          placeholder="Search…"
          type="text"
          endAdornment={
            <>
              <InputAdornment position="end">
                {inputPropsValue && (
                  <Badge color="secondary">
                    <CancelIcon
                      size="large"
                      aria-label="search"
                      color="inherit"
                      sx={{ mr: 0, cursor: "pointer" }}
                      onClick={handleClear}
                    />
                  </Badge>
                )}
              </InputAdornment>
              <InputAdornment position="end" color="secondary">
              <Badge color="secondary">
                <IconButton
                  size="large"
                  aria-label="search"
                  sx={{ mr: 1, color:"inherit", cursor: "pointer", }}
                  onClick={toggleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Badge>
              </InputAdornment>
            
            </>
          }

        />
        {groupedOptions.length > 0 ? (
          
          <Listbox {...getListboxProps()} >
            {groupedOptions.map((option, index) => (
              <ListItem {...getOptionProps({ option, index })}>
                <ListItemText  primary={option} />
              </ListItem>
            ))}
          </Listbox>
        ) : null}
        
      </Search>
    )
    : 
    (
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
    )
  )
}

export default SearchLayout;