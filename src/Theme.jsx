import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define a base theme with reasonable defaults
export const baseTheme = createTheme({
  palette: {
    mode: 'light', // Default to light mode
    primary: {
      main: '#1976D2', // Blue for primary color
    },
    background: {
      default: '#fff', // White for background
    },
  },
  typography: {
    fontFamily: 'sans-serif', // Set a default font family
  },
});

// Create custom themes based on the base
export const darkTheme = createTheme({
  ...baseTheme, // Inherit properties from the base theme
  palette: {
    mode: 'dark', // Set mode to dark
    primary: {
      main: '#000FFF', // Custom primary color for dark theme
    },
    background: {
      default: '#121212', // Dark background color
    },
  },
});

export const lightTheme = createTheme({
  ...baseTheme, // Inherit properties from the base theme
  // No additional changes required for light theme
});
