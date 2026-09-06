import s from './Header.module.css'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { selectTheme, changeThemeAC } from '@/app'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { Button } from '../Button/Button'
import { NavLink } from 'react-router'
import { Path } from '@/commun/instance'

const styleLink = { color: 'text.primary' }

export const Header = () => {
    const themeMode = useAppSelector(selectTheme)
    const dispatch = useAppDispatch()

    function changeMode() {
        dispatch(changeThemeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
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
                        {themeMode === 'dark' ? (
                            <IconButton onClick={changeMode}>
                                <DarkModeIcon sx={{ iconStyle }} />
                            </IconButton>
                        ) : (
                            <IconButton onClick={changeMode}>
                                <LightModeIcon sx={{ iconStyle }} />
                            </IconButton>
                        )}
                        <Button name='Login' primary to='/login' />
                    </Box>

                </Paper>
            </div>
        </header>
    )
}

const iconStyle = { fontSize: 30 }