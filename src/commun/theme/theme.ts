import { createTheme } from '@mui/material/styles';
import type { ThemeMode } from '@/app/app-reducer';


export function getTheme(theme: ThemeMode){
    switch (theme){
        case 'dark':
            return darkTheme
        case 'light':
            return lightTheme
    }
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0B1220',
      paper: '#111827',
    },

    primary: {
      main: '#A78BFA',
    },

    text: {
      primary: '#F9FAFB',
      secondary: '#E5E7EB',
    }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F5F7FB',
      paper: '#FFF',

    },

    primary: {
      main: '#A78BFA',
    },

    text: {
      primary: '#1F2937',
      secondary: '#374151',
    }
  },
});