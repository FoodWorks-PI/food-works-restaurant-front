// @flow strict

import {createMuiTheme} from '@material-ui/core';
import Montserrat from 'assets/fonts/Montserrat-Regular.ttf';

const montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  src: `
    local('Montserrat'),
    url(${Montserrat})
    format('truetype')
  `,
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7EA8EF',
    },
    secondary: {
      main: '#2E294E',
    },
    warning: {
      main: '#FFEB3B',
    },
    error: {
      main: '#FF1744',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [montserrat],
      },
    },
  },
});
