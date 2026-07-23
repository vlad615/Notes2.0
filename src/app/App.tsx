import { Header } from '@/commun/components/Header/Header'
import { ToDoLists } from '@/features/todolists/ui/ToDoLists/ToDoLists'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '@/index.css'
import { useAppSelector } from '@/commun/hooks'
import { selectTheme } from './app-selector'
import { getTheme } from '@/commun/theme/theme'

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
