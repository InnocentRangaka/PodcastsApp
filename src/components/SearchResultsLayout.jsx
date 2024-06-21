import React from 'react';
import { Grid, Typography } from '@mui/material';

const SearchResultsLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  return (
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ padding: 3 }}>
        {dataFiltered.map((d) => (
          <div
            className="text"
            style={{
              padding: 5,
              justifyContent: "normal",
              fontSize: 20,
              color: "blue",
              margin: 1,
              width: "250px",
              BorderColor: "green",
              borderWidth: "10px"
            }}
            key={d.id}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsLayout;
