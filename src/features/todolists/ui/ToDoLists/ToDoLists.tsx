import { useGetTodolistsQuery, useReorderTodolistMutation } from '@/features/todolists/api'
import { Box } from '@mui/material'
import { CardItem } from './CardItem/'
import { Form } from './Form/'
import { TodoSkeleton } from './TodoSkeleton'
import s from './ToDoLists.module.css'
import { Fragment } from 'react/jsx-runtime'
import { _NEVER } from '@reduxjs/toolkit/query'
import { useRef } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

export const ToDoLists = () => {
    const lastOverElement = useRef(null);
    const [reorderTodo] = useReorderTodolistMutation()
    const { data, isLoading } = useGetTodolistsQuery(undefined,
        // {pollingInterval: 5000, skipPollingIfUnfocused: true}
    )
    function onDragOver(operation: any) {
        const { source, target } = operation;
        if (source.id !== target.id) lastOverElement.current = target.id
    }

    function onDragEnd(operation: any) {
        const { target } = operation

        if (lastOverElement.current) {
            reorderTodo({ todolistId: target.id, after: lastOverElement.current })
        }
        lastOverElement.current = null
    }

    if (isLoading) {
        return (
            <Box component={'section'}>
                <Box className="container">
                    <Box className={s.tasksWrapper}>
                        {Array(3).fill(null).map((_, id) => (
                            <TodoSkeleton key={id} />
                        ))}
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <Form />
                    <DragDropProvider onDragOver={({ operation }) => onDragOver(operation)}
                        onDragEnd={({ operation }) => onDragEnd(operation)}>
                        <Box className={s.tasksWrapper}>
                            {data?.map((list, index) => (
                                <Fragment key={list.id}>
                                    <CardItem list={list} index={index} />
                                </Fragment>
                            ))}
                        </Box>
                    </DragDropProvider>
                </Box>
            </Box>
        </Box >
    )
}
