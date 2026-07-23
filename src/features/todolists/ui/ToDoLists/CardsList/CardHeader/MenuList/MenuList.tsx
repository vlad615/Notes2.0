import React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

type Props = {
    deleteList: () => void
    deleteAllTasks: () => void
}

export const MenuList = ({ deleteList, deleteAllTasks }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const delAll = () => {
        setAnchorEl(null)
        deleteAllTasks()
    }
    return (
        <>
            <IconButton aria-controls={open ? 'long-menu' : undefined} aria-expanded={open} onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            width: '20ch',
                        },
                    },
                    list: {
                        'aria-labelledby': 'long-button',
                    },
                }}>
                <MenuItem onClick={handleClose}>delete done tasks</MenuItem>
                <MenuItem onClick={delAll}>delete all tasks</MenuItem>
                <MenuItem onClick={() => deleteList()}>delet To-Do List</MenuItem>
            </Menu>
        </>
    )
}
