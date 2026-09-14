import { ErrorAlert, Header, PageNotFound, ProtectedRoute } from '@/commun/components';
import { ResultCode } from '@/commun/enums';
import { useAppDispatch, useAppSelector } from '@/commun/hooks';
import { Path } from '@/commun/instance';
import { getTheme } from '@/commun/theme/';
import { Login } from '@/features/auth';
import { useMeQuery } from '@/features/auth/api/';
import { ToDoLists } from '@/features/todolists/ui/';
import './App.css';
import { Box, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router';
import { selectIsLoggedIn, selectStatus, selectTheme, setIsLoggedInAC } from './app-slice';

const loaderStyle = {
    position: "fixed",
    top: "50%",
    left: "50%", transform: 'translate(-50%, -50%)'
}

export function App() {
    const [isAuthInitialized, setIsAuthInitialized] = useState(false)

    const themeMode = useAppSelector(selectTheme)
    const status = useAppSelector(selectStatus)
    const isLogged = useAppSelector(selectIsLoggedIn)

    const { data, isLoading } = useMeQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoading) return
        if (data?.resultCode == ResultCode.Succeeded) {
            dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        }
        setIsAuthInitialized(true)
    }, [isLoading])

    const theme = useMemo(() => getTheme(themeMode), [themeMode])

    if (!isAuthInitialized) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={loaderStyle}>
                    <CircularProgress />
                </Box>

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
