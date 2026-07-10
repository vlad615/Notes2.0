import s from "./Header.module.css"
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from "@mui/material";


export const Header = () => {
    return (
        <header>
            <div className="container">
                <div className={s.headerWrapper}>
                    <div className={s.iconWrapper}>
                        <CheckBoxOutlinedIcon color='secondary' fontSize='large' />
                        <h1>To Do List</h1>
                    </div>
                    <IconButton><LightModeIcon sx= {{fontSize: 30}}/></IconButton>
                </div>
            </div>
        </header>
    )
}