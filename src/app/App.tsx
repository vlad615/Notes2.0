import { Header } from "@/layout/header/Header";
import { ToDoLists } from "@/layout/todoList/ToDoLists"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "@/index.css"
import { useAppSelector } from "@/commun/hooks/useAppSelector";
import { selectTheme } from "./app-selector";
import { getTheme } from "@/commun/theme/theme";


export function App() {
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <ToDoLists />
      </ThemeProvider>
    </>
  )
}

