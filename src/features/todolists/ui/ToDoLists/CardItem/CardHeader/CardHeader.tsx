import { EditebleTitle } from '@/commun/components'
import { useAppDispatch } from '@/commun/hooks'
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation, useGetTasksQuery, type ListType } from '@/features/todolists/api'
import { changeEntityStatus } from '@/features/todolists/utils'
import { Badge, Box } from '@mui/material'
import { memo, useCallback } from 'react'
import s from '../CardItem.module.css'
import { MenuList } from './MenuList/'

type Props = {
    id: ListType['id']
    currentTitle: ListType['title']
}

const anchorOrigin = { vertical: 'top', horizontal: 'left' } as const

export const CardHeader = memo(({ id, currentTitle }: Props) => {
    const { data: tasks = [] } = useGetTasksQuery(id)

    const dispatch = useAppDispatch()

    const [changeTitle] = useChangeTodolistTitleMutation()
    const [deleteTodo] = useDeleteTodolistMutation()

    const editListTitle = useCallback((title: ListType['title']) => {
        changeEntityStatus(id, 'loading', dispatch)
        changeTitle({ id, title }).finally(() => {changeEntityStatus(id, 'idle', dispatch)})
    }, [dispatch, id])

    const deleteList = useCallback(() => {
        changeEntityStatus(id, 'loading', dispatch)
        deleteTodo(id).finally(() => {changeEntityStatus(id, 'idle', dispatch)})
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
            <MenuList deleteList={deleteList} />
        </Box>
    )
})
