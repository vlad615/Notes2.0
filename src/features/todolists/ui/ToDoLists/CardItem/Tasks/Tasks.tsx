import { TaskStatus } from '@/commun/enums'
import { useGetTasksQuery, type DomainTask, type ListType } from '@/features/todolists/api'
import { List } from '@mui/material'
import { memo, useMemo, useState } from 'react'
import { TaskItem } from './TaskItem/TaskItem'
import { TasksSkeleton } from './TasksSkeleton/TasksSkeleton'
import { TasksPagination } from './TasksPagination'
import { PAGE_SIZE } from '@/commun/constants'

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

const styleTasks = { width: '100%', overflow: 'auto', maxHeight: 260, scrollbarWidth: 'thin' }

export const Tasks = memo(({ id, filter }: Props) => {
    const [page, setPage] = useState(1)
    const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } },
        // { refetchOnFocus: true }
    )

    if (isLoading) {
        return <TasksSkeleton />
    }

    const totalCount = data?.totalCount || 0

    const filteredTasks = useMemo<DomainTask[] | string>(() => {
        if (!data || !totalCount) {
            return 'No tasks!'
        }

        if (filter === 'active') {
            const activeTasks = data.items.filter((t: DomainTask) => t.status === TaskStatus.Active)
            return activeTasks.length ? activeTasks : 'All tasks is done!'
        }

        if (filter === 'completed') {
            const completedTasks = data.items.filter((t: DomainTask) => t.status === TaskStatus.Completed)
            return completedTasks.length ? completedTasks : 'U have complite no tasks, yet!'
        }

        return data.items
    }, [filter, data])

    console.log(id, totalCount, data?.totalCount, data?.items, (typeof filteredTasks === 'string' && filteredTasks.length && filteredTasks));

    return (
        <>
            {Array.isArray(filteredTasks) &&
                <List sx={styleTasks}>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} idList={id} task={task} />
                    ))}
                </List>}
            {typeof filteredTasks === 'string' && filteredTasks}
            {totalCount > PAGE_SIZE && <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />}
        </>
    )
})
