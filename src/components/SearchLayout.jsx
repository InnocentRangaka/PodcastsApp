import React, { useState, useEffect } from 'react';
import { TextField, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

// Assuming you have fetched podcasts, seasons, and episodes data from an API
const podcastData = [
  { id: '1', title: 'Podcast 1', genre: 'Tech' },
  { id: '2', title: 'Podcast 2', genre: 'Education' },
  { id: '3', title: 'Podcast 3', genre: 'Health' },
  // Add more podcast objects as needed
];

const SearchLayout = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('Title'); // Default to 'Title'
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Filter podcasts based on search input and type
    if (inputValue.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = podcastData.filter(podcast => {
        const lowerCaseInput = inputValue.toLowerCase();
        switch (searchType) {
          case 'Title':
            return podcast.title.toLowerCase().includes(lowerCaseInput);
          case 'ID':
            return podcast.id.toLowerCase().includes(lowerCaseInput);
          case 'Genre':
            return podcast.genre.toLowerCase().includes(lowerCaseInput);
          default:
            return false;
        }
      });
      setSearchResults(filteredResults);
    }
  }, [inputValue, searchType]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <div>
      <Autocomplete
        value={searchType}
        onChange={(event, newValue) => setSearchType(newValue)}
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
            <h2>{podcast.title}</h2>
            <p>ID: {podcast.id}</p>
            <p>Genre: {podcast.genre}</p>
            {/* Add other components or functionality as needed */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchLayout;
