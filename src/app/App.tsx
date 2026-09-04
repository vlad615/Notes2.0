import { ToDoLists } from '@/features/todolists/ui/ToDoLists/ToDoLists';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router';
import { ErrorAlert, Header } from '@/commun/components';
import { useAppSelector } from '@/commun/hooks';
import { getTheme } from '@/commun/theme/theme';
import '@/index.css';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import { useMemo } from 'react';
import { selectStatus, selectTheme } from './app-slice';
import { Login } from '@/features/auth';

export function App() {
    const themeMode = useAppSelector(selectTheme)
    const status = useAppSelector(selectStatus)
    const theme = useMemo(() => getTheme(themeMode), [themeMode])
    return (
        <ThemeProvider theme={theme}>

            <CssBaseline />
            {status === 'loading' && <LinearProgress />}
            <Header />
            <Routes>
                <Route path='/' element={<ToDoLists />} />
                <Route path='/login' element={<Login />} />
            </Routes>
            <ErrorAlert />
        </ThemeProvider>
    )
}
