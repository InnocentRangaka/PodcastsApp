import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Popper } from '@mui/base/Popper';
import { styled, alpha } from '@mui/material/styles';
import useForkRef from '@mui/utils/useForkRef';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

let searchInputValue = null;
const toggleSearch = () => {
  // setShowSearch(!showSearch);
};

const handleFocus = () => {};

const setSearchValue = (inputValue) => {
  searchInputValue = inputValue;
};

const handleSearch = (inputValue) => {
  setSearchValue(inputValue);
};

const handleClear = (v) => {
  console.log(v);
};

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    ...other
  } = props;

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const {
    getRootProps,
    getInputProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    dirty,
    id,
    focused,
    popupOpen,
    anchorEl,
    inputValue,
    value,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete(props);

  const rootRef = useForkRef(ref, setAnchorEl);

  const handleOptionClick = (option) => {
    navigate(`/show/${option.label}`); // Navigate to the selected option's route
  };

  const optionRender = (option, index) => {
    const optionProps = getOptionProps({ option, index });
    const { key, ...restOptionProps } = optionProps;

    return (
      <Option
        key={key}
        {...restOptionProps}
        onClick={() => handleOptionClick(option)} // Add click handler
      >
        {option.label}
      </Option>
    );
  };

  const listRender = (groupedOptions) => {
    const { key, ...restOptionProps } = getListboxProps();
    return (
      <Listbox key={key} {...restOptionProps}>
        {groupedOptions.length > 0 ? (
          groupedOptions.map((option, index) => optionRender(option, index))
        ) : (
          <NoOptions>No results</NoOptions>
        )}
      </Listbox>
    );
  };

  inputValue && handleSearch(inputValue);
  const { key, ...restClearProps } = getClearProps();

  return (
    <React.Fragment>
      <Search
        {...getRootProps()}
        ref={rootRef}
        className={focused || searchInputValue ? 'Mui-focused' : ''}
      >
        {focused && (
          <Badge color="secondary">
            <IconButton
              size="large"
              aria-label="search"
              sx={{ mr: 0, color: '#aaa', maxHeight: '37px', }}
              disabled={true}
            >
              <SearchIcon />
            </IconButton>
          </Badge>
        )}
        <StyledInput
          {...getInputProps()}
          variant="standard"
          label="Size small"
          placeholder="Search…"
          type="text"
        />
        {/* {focused && (
          <Badge color="secondary">
            {!value ? (
              <IconButton
                size="large"
                aria-label="search"
                sx={{ mr: 0, color: 'inherit', cursor: 'pointer', maxHeight: '37px', width: '48px' }}
              />
            ) : (
              <IconButton
                {...restClearProps}
                size="large"
                aria-label="search"
                sx={{ mr: 0, color: 'inherit', cursor: 'pointer', width: '48px' }}
                onClick={handleClear}
              >
                <ClearIcon key={`${key}Cancel`} />
              </IconButton>
            )}
          </Badge>
        )} */}
      </Search>
      {anchorEl && (
        
        <Popper
        open={popupOpen}
        anchorEl={anchorEl}
        slots={{
            root: StyledPopper,
        }}
        placement='bottom-end'
        sx={{ overflow: 'hidden' }}
        >    
        {listRender(groupedOptions)}
        </Popper>
      )}
    </React.Fragment>
  );
});

export default function SearchAutocomplete() {
  const [valueInInput, setValueInInput] = useState(null);

  const handleChange = (event, newValue) => setValueInInput(newValue);

  return (
    <Autocomplete
      options={top100Films}
      value={valueInInput}
      onChange={handleChange}
    />
  );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    paddingTop: '0px',
    paddingBottom: '0px',
    marginLeft: 0,
    width: '100%',
    maxHeight: '37px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));

const StyledInput = styled('input')(({ theme }) => ({
    // color: '#aaa',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    fontWeight: 400,
    lineHeight: 1.5,
    width: '100%',
    background: 'inherit',
    border: 'none',
    borderRadius: 'inherit',
    padding: '8px 12px',
    outline: 0,
    flex: '1 0 auto',
    paddingTop: theme.spacing(1, 1, 1, 0),
    paddingRight: theme.spacing(1, 1, 1, 0),
    paddingBottom: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(1, 1, 1, 0),
    backgroundColor: alpha(theme.palette.common.black, .1),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '320px',
            marginTop: '0px',
        },
    },
  }));

// ComponentPageTabs has z-index: 1000
const StyledPopper = styled('div')`
  position: relative;
  z-index: 1001;
  width: 100%;
  max-width: 320px;
  max-height: 320px;
  overflow: 'hidden';
  border-radius: '8px';
  box-sizing: 'border-box';
`;

const Listbox = styled('ul')(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    padding: '6px',
    margin: '12px 0',
    zIndex: 10,
    position: 'absolute',
    listStyle: 'none',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    outline: '0px',
    backgroundColor: alpha(theme.palette.common.black, 1),
    minWidth: 223,
    maxWidth: 320,
    maxHeight: 320,
    transition: theme.transitions.create('height'),
    borderRadius: '12px',
    overflow: 'hidden auto',
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
    boxShadow: `0px 4px 6px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    }`
  }));

const Option = styled('li')(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? '#aaa' : alpha(theme.palette.common.black, 1)};
    color: ${theme.palette.mode === 'dark' ? '#fff' : '#000'};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? '#aaa' : alpha(theme.palette.common.black, 1)};
    color: ${theme.palette.mode === 'dark' ? '#fff' : '#000'};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? alpha(theme.palette.common.black, 1) : alpha(theme.palette.common.black, 1)};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? '#aaa' : alpha(theme.palette.common.black, 1)};
    color: ${theme.palette.mode === 'dark' ? '#fff' : '#000'};
  }
  `,
);

const NoOptions = styled('li')`
  list-style: none;
  padding: 8px;
  cursor: default;
`;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
