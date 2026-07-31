import { MenuList } from './MenuList/MenuList'
import { Badge, Box } from '@mui/material'
import s from '../CardItem.module.css'
import { EditebleTitle } from '@/commun/components'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import {
    changeTodolistTitleTC,
    deleteTodolistTC,
    deleteAllTasksTC,
    selectTasks,
    type ListType,
    deleteAllDoneTasksTC,
} from '@/features/todolists/model'
import { memo, useCallback } from 'react'

type Props = {
    id: ListType['id']
    currentTitle: ListType['title']
}

export const CardHeader = memo(({ id, currentTitle }: Props) => {
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const editListTitle = useCallback((title: ListType['title']) => {
        dispatch(changeTodolistTitleTC({ id, title }))
    }, [dispatch, id])

    const deleteList = useCallback(() => {
        dispatch(deleteTodolistTC(id))
    }, [dispatch, id])

    const deleteAllTasks = useCallback(() => {
        dispatch(deleteAllTasksTC(id))
    }, [dispatch, id])

    const deleteAllDoneTasks = useCallback(() => {
        dispatch(deleteAllDoneTasksTC(id))
    }, [dispatch, id])

    return (
        <Box className={s.titleWrapper}>
            <Badge
                color="secondary"
                badgeContent={tasks[id]?.length}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <h2>
                    <EditebleTitle title={currentTitle} setNewTitle={(title) => editListTitle(title)} />
                </h2>
            </Badge>
            <MenuList deleteList={deleteList} deleteAllTasks={deleteAllTasks} deleteAllDoneTasks={deleteAllDoneTasks} />
        </Box>
    )
})
