import { ErrorAlert, Header, PageNotFound, ProtectedRoute } from '@/commun/components';
import { useAppDispatch, useAppSelector } from '@/commun/hooks';
import { Path } from '@/commun/instance';
import { getTheme } from '@/commun/theme/theme';
import { authSelect, initializeAppTC, Login } from '@/features/auth';
import { ToDoLists } from '@/features/todolists/ui/ToDoLists/ToDoLists';
import '@/index.css';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router';
import { selectStatus, selectTheme } from './app-slice';
import { CircularProgress } from '@mui/material';

export function App() {
    const themeMode = useAppSelector(selectTheme)
    const status = useAppSelector(selectStatus)
    const isLogged = useAppSelector(authSelect)
    const dispatch = useAppDispatch()
    const [isAuthInitialized, setIsAuthInitialized] = useState(false)

    useEffect(() => {
        dispatch(initializeAppTC()).finally(() => {
            setIsAuthInitialized(true)
        })
    }, [])

    const theme = useMemo(() => getTheme(themeMode), [themeMode])

    if (!isAuthInitialized) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CircularProgress />
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {status === 'loading' && <LinearProgress />}
            <Header />
            <Routes>
                <Route element={<ProtectedRoute isAllowed={isLogged} />}>
                    <Route path={Path.Main} element={<ToDoLists />} />
                </Route>

                <Route element={<ProtectedRoute isAllowed={!isLogged} redirectPath={Path.Main} />}>
                    <Route path={Path.Login} element={<Login />} />
                </Route>
                <Route path={Path.NotFound} element={<PageNotFound />} />
            </Routes>
            <ErrorAlert />
        </ThemeProvider>
    )
}
