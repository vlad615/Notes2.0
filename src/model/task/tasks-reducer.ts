import type { TaskProps } from '../../layout/todoList/components/CardList'
import type { TasksType } from '../../layout/todoList/ToDoLists'
import type { CreateTodolistAction, DeleteTodolistAction } from '../list/todolists-reducer'

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: Actions): TasksType => {
  switch (action.type) {
    case 'delete_task': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
      }
    }
    case 'create_task': {
      const newTask: TaskProps = { title: action.payload.title, isDone: false, id: crypto.randomUUID() }
      console.log('create task', newTask);

      return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
    }
    case "change_task_status": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: !task.isDone } : task)
      }
    }
    case "change_task_title": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task)
      }
    }
    case "delete_all_tasks": {
      return { ...state, [action.payload.id]: [] }
    }
    case "create_todolist": {
      return { ...state, [action.payload.id]: [] }
    }
    case "delete_todolist": {
      const newState = { ...state }
      delete newState[action.payload.id]
      return newState
    }
    default:
      return state
  }
}

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
  return { type: 'delete_task', payload } as const
}

export const createTaskAC = (payload: { todolistId: string, title: string }) => {
  return { type: 'create_task', payload } as const
}

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string }) => {
  return { type: 'change_task_status', payload } as const
}

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
  return { type: 'change_task_title', payload } as const
}

export const deleteAllTasksAC = (payload: { id: string }) => {
  return { type: 'delete_all_tasks', payload } as const
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
export type deleteAllTasksAction = ReturnType<typeof deleteAllTasksAC>


type Actions =
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction
  | deleteAllTasksAction
  | CreateTodolistAction
  | DeleteTodolistAction
