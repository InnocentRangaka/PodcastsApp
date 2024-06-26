import React, { useState, useContext, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Popper } from '@mui/base/Popper';
import { styled, alpha } from '@mui/material/styles';
import useForkRef from '@mui/utils/useForkRef';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PodcastsContext from '../../PodcastsContext'; 
import { sortAlphabetically } from '../../../utils/podcastUtils'

let searchInputValue = null;
const setSearchValue = (inputValue) => {
  searchInputValue = inputValue;
};

const handleSearch = (inputValue) => {
  setSearchValue(inputValue);
};

const Autocomplete = forwardRef(function Autocomplete(props, ref) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    ...other
  } = props;

  const navigate = useNavigate();

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
    setAnchorEl,
    groupedOptions,
    getOptionLabel,
  } = useAutocomplete({
    ...props,
    getOptionLabel: (option) => option.title,
  });

  const rootRef = useForkRef(ref, setAnchorEl);

  const handleOptionClick = (option) => {
    navigate(`/show/${option.title}`, {
      state: {
        show: {
          id: option.id,
          title: option.title,
        },
      },
    });
  };

  const optionRender = (option, index) => {
    const optionProps = getOptionProps({ option, index });
    const { key, ...restOptionProps } = optionProps;

    return (
      <Option
        key={key}
        {...restOptionProps}
        onClick={() => handleOptionClick(option)}
      >
        {option.title}
      </Option>
    );
  };

  const listRender = (groupedOptions) => {
    const { key, ...restOptionProps } = getListboxProps();
    return (
      <Listbox key={`listRender${key}`} {...restOptionProps}>
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
      </Search>
      {anchorEl && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slots={{
              root: StyledPopper,
          }}
          placement='bottom-end'
          sx={{ borderRadius: '2px' }}
        >
          {listRender(groupedOptions)}
        </Popper>
      )}
    </React.Fragment>
  );
});

export default function SearchAutocomplete() {
  const [valueInInput, setValueInInput] = useState(null);
  const { podcasts } = useContext(PodcastsContext);

  const handleChange = (event, newValue) => setValueInInput(newValue);

  const data = sortAlphabetically(podcasts)

  return (
    <Autocomplete
      options={data}
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
  max-height: 330px;
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
