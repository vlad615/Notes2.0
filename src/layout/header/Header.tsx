import s from "./Header.module.css"
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box, IconButton, Paper } from "@mui/material";

type Props = {
    dark: boolean
    setDark: ()=>void
}

export const Header = ({dark, setDark}: Props) => {
    return (
        <header>
            <div className="container">
                <Paper className={s.headerWrapper}>
                    <Box className={s.iconWrapper}>
                        <CheckBoxOutlinedIcon color='secondary' fontSize='large' />
                        <h1>To Do List</h1>
                    </Box>
                    {dark? <IconButton onClick={setDark}><DarkModeIcon sx= {{fontSize: 30}}/></IconButton> 
                    : <IconButton onClick={setDark}><LightModeIcon sx= {{fontSize: 30}}/></IconButton>}
                </Paper>
            </div>
        </header>
    )
}