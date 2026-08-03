import React, { memo, useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

type Props = {
    deleteList: () => void
    deleteAllTasks: () => void
    deleteAllDoneTasks: () => void
}

const slotProps = {
    paper: { style: { width: '20ch', }, },
    list: { 'aria-labelledby': 'long-button', },
}

export const MenuList = memo(({ deleteList, deleteAllTasks, deleteAllDoneTasks }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const delAll = useCallback(() => {
        setAnchorEl(null)
        deleteAllTasks()
    }, [])

    const delAllDone = useCallback(() => {
        setAnchorEl(null)
        deleteAllDoneTasks()
    }, [])

    return (
        <>
            <IconButton aria-controls={open ? 'long-menu' : undefined} aria-expanded={open} onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={slotProps}>
                <MenuItem onClick={delAllDone}>delete done tasks</MenuItem>
                <MenuItem onClick={delAll}>delete all tasks</MenuItem>
                <MenuItem onClick={deleteList}>delet To-Do List</MenuItem>
            </Menu>
        </>
    )
})
