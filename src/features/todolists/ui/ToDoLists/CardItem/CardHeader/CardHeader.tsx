import { EditebleTitle } from '@/commun/components'
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation, useGetTasksQuery, type ListType } from '@/features/todolists/api'
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
    const { data } = useGetTasksQuery({
        todolistId: id,
        params: { page: 1 },
    })

    const [changeTitle] = useChangeTodolistTitleMutation()
    const [deleteTodo] = useDeleteTodolistMutation()

    const editListTitle = useCallback((title: ListType['title']) => {
        changeTitle({ id, title })
    }, [id])

    const deleteList = useCallback(() => {
        deleteTodo(id)
    }, [id])

    return (
        <Box className={s.titleWrapper}>
            <Badge
                color="secondary"
                badgeContent={data?.totalCount}
                anchorOrigin={anchorOrigin}>
                <h2>
                    <EditebleTitle title={currentTitle} setNewTitle={(title) => editListTitle(title)} />
                </h2>
            </Badge>
            <MenuList deleteList={deleteList} />
        </Box>
    )
})
