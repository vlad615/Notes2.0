import s from "./Header.module.css"
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box, IconButton, Paper } from "@mui/material";
import { selectTheme, changeThemeAC } from "@/app";
import { useAppDispatch, useAppSelector } from "@/commun/hooks";


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
                    <Box className={s.iconWrapper}>
                        <CheckBoxOutlinedIcon color='secondary' fontSize='large' />
                        <h1>To Do List</h1>
                    </Box>
                    {themeMode === 'dark' ? <IconButton onClick={changeMode}><DarkModeIcon sx={{ fontSize: 30 }} /></IconButton>
                        : <IconButton onClick={changeMode}><LightModeIcon sx={{ fontSize: 30 }} /></IconButton>}
                </Paper>
            </div>
        </header>
    )
}