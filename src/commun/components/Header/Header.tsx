import { changeThemeAC, selectIsLoggedIn, selectTheme, setIsLoggedInAC } from '@/app'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { Path } from '@/commun/instance'
import { loginSelect, LogoutTC } from '@/features/auth'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { NavLink } from 'react-router'
import { ResultCode } from '@/commun/enums';
import { Button } from '../Button/Button'
import s from './Header.module.css'
import { AUTH_TOKEN } from '@/commun/constants'
import { useLogoutMutation } from '@/features/auth/api/authApi'

const styleLink = { color: 'text.primary' }

export const Header = () => {
    const themeMode = useAppSelector(selectTheme)
    const login = useAppSelector(loginSelect)
    const logged = useAppSelector(selectIsLoggedIn)
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()

    function changeMode() {
        dispatch(changeThemeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
    }

    function handleLogout() {
        logout().unwrap().then((data) => {
            if (data.resultCode === ResultCode.Succeeded) {
                dispatch(setIsLoggedInAC({ isLoggedIn: false }))
                localStorage.removeItem(AUTH_TOKEN)
            }
        })
    }
    return (
        <header>
            <div className="container">
                <Paper className={s.headerWrapper}>
                    <Box component={NavLink} to={Path.Main} className={s.iconWrapper} sx={styleLink}>
                        <CheckBoxOutlinedIcon color="secondary" fontSize="large" />
                        <Typography variant='h3' component='h1' >To Do List</Typography>
                    </Box>

                    <Box className={s.iconWrapper}>
                        <span>{login}</span>
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

const iconStyle = { fontSize: 30 }