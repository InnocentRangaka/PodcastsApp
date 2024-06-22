import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import MainMenu from './MainMenu';
import SearchLayout from './SearchLayout'; // Assuming SearchComponent is imported correctly

const SearchComponent = ({ podcasts, setSearchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('Title'); // Default to 'Title'
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // This effect filters podcasts based on user input and selected search type
    if (inputValue.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = podcasts.filter(podcast => {
        const lowerCaseInput = inputValue.toLowerCase();
        switch (searchType) {
          case 'Title':
            return podcast.title.toLowerCase().includes(lowerCaseInput);
          case 'ID':
            return podcast.id.toLowerCase().includes(lowerCaseInput);
          case 'Genre':
            return podcast.genres.some(genre => genre === parseInt(inputValue)); // Assuming genres are numeric
          default:
            return false;
        }
      });
      setSearchResults(filteredResults);
    }
  }, [inputValue, searchType, podcasts]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleTypeChange = (event, newValue) => {
    setSearchType(newValue);
  };

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  return (
    <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter a city name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
  );
};

export default SearchComponent;
