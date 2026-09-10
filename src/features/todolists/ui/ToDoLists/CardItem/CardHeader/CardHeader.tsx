import { EditebleTitle } from '@/commun/components'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation, type ListType } from '@/features/todolists/api'
import {
    deleteAllDoneTasksTC,
    deleteAllTasksTC,
    selectTasks
} from '@/features/todolists/model'
import { Badge, Box } from '@mui/material'
import { memo, useCallback } from 'react'
import s from '../CardItem.module.css'
import { MenuList } from './MenuList/MenuList'

type Props = {
    id: ListType['id']
    currentTitle: ListType['title']
}

const anchorOrigin = { vertical: 'top', horizontal: 'left' } as const

export const CardHeader = memo(({ id, currentTitle }: Props) => {
    const EMPTY_TASKS: any[] = []
    const tasks = useAppSelector((state) => selectTasks(state)[id] ?? EMPTY_TASKS)

    const dispatch = useAppDispatch()

    const [changeTitle] = useChangeTodolistTitleMutation()
    const [deleteTodo] = useDeleteTodolistMutation()

    const editListTitle = useCallback((title: ListType['title']) => {
        changeTitle({ id, title })
    }, [dispatch, id])

    const deleteList = useCallback(() => {
        deleteTodo(id)
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
                badgeContent={tasks?.length}
                anchorOrigin={anchorOrigin}>
                <h2>
                    <EditebleTitle title={currentTitle} setNewTitle={(title) => editListTitle(title)} />
                </h2>
            </Badge>
            <MenuList deleteList={deleteList} deleteAllTasks={deleteAllTasks} deleteAllDoneTasks={deleteAllDoneTasks} />
        </Box>
    )
})
