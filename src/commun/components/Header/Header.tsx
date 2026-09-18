import { changeThemeAC, selectIsLoggedIn, selectTheme, setIsLoggedInAC } from '@/app'
import { AUTH_TOKEN } from '@/commun/constants'
import { ResultCode } from '@/commun/enums'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { baseApi, Path } from '@/commun/instance'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { useCallback } from 'react'
import { NavLink } from 'react-router'
import { Button } from '../Button/Button'
import s from './Header.module.css'

const styleLink = { color: 'text.primary' }
const iconStyle = { fontSize: 30 }

export const Header = () => {
    const themeMode = useAppSelector(selectTheme)
    const logged = useAppSelector(selectIsLoggedIn)

    const { data, isLoading, isSuccess } = useMeQuery()
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()

    const changeMode = useCallback(() => {
        dispatch(changeThemeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
    }, [dispatch, themeMode])

    const handleLogout = useCallback(() => {
        logout().unwrap().then((data) => {
            if (data.resultCode === ResultCode.Succeeded) {
                dispatch(setIsLoggedInAC({ isLoggedIn: false }))
                localStorage.removeItem(AUTH_TOKEN)
                // dispatch(baseApi.util.resetApiState())
            }
        }).then(() => {
            dispatch(baseApi.util.invalidateTags(["Task", "Todolist"]))
        })
    }, [dispatch, logout])

    return (
        <header>
            <div className="container">
                <Paper className={s.headerWrapper}>
                    <Box component={NavLink} to={Path.Main} className={s.iconWrapper} sx={styleLink}>
                        <CheckBoxOutlinedIcon color="secondary" fontSize="large" />
                        <Typography variant='h3' component='h1' >To Do List</Typography>
                    </Box>

                    <Box className={s.iconWrapper}>
                        {!isLoading && isSuccess && data?.resultCode === ResultCode.Succeeded && (
                            <span>{data.data.login}</span>
                        )}
                        {themeMode === 'dark' ? (
                            <IconButton onClick={changeMode}>
                                <DarkModeIcon sx={{ iconStyle }} />
                            </IconButton>
                        ) : (
                            <IconButton onClick={changeMode}>
                                <LightModeIcon sx={{ iconStyle }} />
                            </IconButton>
                        )}
                        {logged ? <Button name='Logout' primary callBack={handleLogout} /> : <Button name='Login' primary to='/login' />}
                    </Box>

                </Paper>
            </div>
        </header>
    )
}
