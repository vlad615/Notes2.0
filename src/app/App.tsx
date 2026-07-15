import { Header } from "../layout/header/Header";
import { ToDoLists } from "../layout/todoList/ToDoLists"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "../index.css"
import  { changeThemeAC } from "../app/app-reducer";
import { useAppSelector } from "../commun/hooks/useAppSelector";
import { selectTheme } from "./app-selector";
import { useAppDispatch } from "../commun/hooks/useAppDispatch";
import { getTheme } from "../commun/theme/theme";


export function App() {
  const themeMode = useAppSelector(selectTheme)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  function changeMode(){
    dispatch(changeThemeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header theme={themeMode} setDark={changeMode} />
        <ToDoLists />
      </ThemeProvider>
    </>
  )
}

