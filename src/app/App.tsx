import { Header } from "../layout/header/Header";
import { ToDoLists } from "../layout/todoList/ToDoLists"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "../index.css"
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

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

export function App() {
  const [dark, setDark] = useState<boolean>(false)

  return (
    <Provider store={store}>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Header dark={dark} setDark={() => setDark(!dark)} />
        <ToDoLists />
      </ThemeProvider>
    </Provider>

  )
}

