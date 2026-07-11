import { beforeEach, expect, test } from 'vitest'
import { createListAC, deleteListAC, listReducer, updateFilterListAC, updateTitleListAC } from './list-reducer'
import type { ListType } from '../../layout/todoList/components/CardList'

let todolistId1: string
let todolistId2: string
let startState: ListType[]

beforeEach(() => {
    todolistId1 = crypto.randomUUID()
    todolistId2 = crypto.randomUUID()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
}
)

test('correct todolist should be deleted', () => {
    const action = deleteListAC(todolistId1)
    const endState = listReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => { 
  const title = 'New todolist'
  const endState = listReducer(startState, createListAC(title))
 
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(title)
})

test('correct todolist should change its title', () => {
  const title = 'New title'
  const endState = listReducer(startState, updateTitleListAC({id: todolistId2, title}))
 
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
  const filter = 'completed'
  const endState = listReducer(startState, updateFilterListAC({id: todolistId2, filter}))
 
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})