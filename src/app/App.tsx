import { ToDoLists } from '@/features/todolists/ui/ToDoLists/ToDoLists'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LinearProgress from '@mui/material/LinearProgress';
import '@/index.css'
import { useAppSelector } from '@/commun/hooks'
import { selectTheme, selectStatus } from './app-slice'
import { getTheme } from '@/commun/theme/theme'
import { ErrorAlert, Header } from '@/commun/components';

export function App() {
    const themeMode = useAppSelector(selectTheme)
    const status = useAppSelector(selectStatus)
    const theme = getTheme(themeMode)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {status === 'loading' && <LinearProgress />}
            <Header />
            <ToDoLists />
            <ErrorAlert />
        </ThemeProvider>
    )
}
