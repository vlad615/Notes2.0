import { beforeEach, expect, test } from 'vitest'
import type { TasksType } from '../../layout/todoList/ToDoLists'
import { createListTasksAC, createTaskAC, deleteListTaskAC, deleteTaskAC, 
    tasksReducer, updateStatusTaskAC, updateTitleTaskAC } from './task-reducer'

let startState: TasksType = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createListTasksAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteListTaskAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({ idList: 'todolistId2', id: '2' })
    )

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})

test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC({
            id: 'todolistId2',
            title: 'juice',
        })
    )    

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('juice')
    expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should change its status', () => {
    const endState = tasksReducer(
        startState,
        updateStatusTaskAC({ idList: 'todolistId2', id: '2' })
    )

    expect(endState.todolistId2['0'].isDone).toBe(false)
    expect(endState.todolistId2['1'].isDone).toBe(false)
    expect(endState.todolistId2['2'].isDone).toBe(false)
})

test('correct task should change its title', () => {
    const endState = tasksReducer(
        startState,
        updateTitleTaskAC({ idList: 'todolistId1', id: '1', title: 'FastApi' })
    )

    expect(endState.todolistId1['0'].title).toBe('FastApi')
    expect(endState.todolistId1['1'].title).toBe('JS')
    expect(endState.todolistId1['2'].title).toBe('React')
})