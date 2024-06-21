import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({ podcasts }) => {
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

  return (
    <div>
      <Autocomplete
        value={searchType}
        onChange={handleTypeChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        id="search-autocomplete"
        options={['Title', 'ID', 'Genre']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon />,
            }}
          />
        )}
      />

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {searchResults.map(podcast => (
          <Grid item xs={12} key={podcast.id}>
            <Typography variant="h6">{podcast.title}</Typography>
            <Typography variant="subtitle1">ID: {podcast.id}</Typography>
            <Typography variant="body1">Description: {podcast.description}</Typography>
            <Typography variant="body2">Seasons: {podcast.seasons}</Typography>
            <img src={podcast.image} alt={podcast.title} style={{ maxWidth: '100%', marginTop: '10px' }} />
            {/* Display other relevant information */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchComponent;
