import { PAGE_SIZE } from '@/commun/constants'
import { TaskStatus } from '@/commun/enums'
import { useGetTasksQuery, useReorderTaskMutation, type DomainTask, type ListType } from '@/features/todolists/api'
import { DragDropProvider } from '@dnd-kit/react'
import { List } from '@mui/material'
import { memo, useMemo, useRef, useState } from 'react'
import { TaskItem } from './TaskItem/TaskItem'
import { TasksPagination } from './TasksPagination'
import { TasksSkeleton } from './TasksSkeleton/TasksSkeleton'

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

const styleTasks = { width: '100%', overflow: 'auto', maxHeight: 260, scrollbarWidth: 'thin' }

export const Tasks = memo(({ id, filter }: Props) => {
    const [page, setPage] = useState(1)
    const lastOverElement = useRef(null);
    const [reorderTask] = useReorderTaskMutation()
    const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } },
        // { refetchOnFocus: true }
    )

    if (isLoading) {
        return <TasksSkeleton />
    }

    function onDragOver(operation: any) {
        const { source, target } = operation;
        if (target && source && source.id !== target.id) lastOverElement.current = target.id
    }

    function onDragEnd(operation: any) {
        const { target } = operation
        console.log(target.id, lastOverElement.current);

        if (lastOverElement.current) reorderTask({ todolistId: id, taskId: target.id, after: lastOverElement.current })
        lastOverElement.current = null
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


    return (
        <>
            {Array.isArray(filteredTasks) &&
                <DragDropProvider onDragOver={({ operation }) => onDragOver(operation)}
                    onDragEnd={({ operation }) => onDragEnd(operation)}>
                    <List sx={styleTasks}>
                        {filteredTasks.map((task, index) => (
                            <TaskItem key={task.id} idList={id} task={task} index={index} />
                        ))}
                    </List>
                </DragDropProvider>
            }
            {typeof filteredTasks === 'string' && filteredTasks}
            {totalCount > PAGE_SIZE && <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />}
        </>
    )
})
