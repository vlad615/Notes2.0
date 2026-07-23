import { type ChangeEvent, type CSSProperties, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { AddItem, EditebleTitle } from '@/commun/components/'
import { todolistsApi, tasksApi, type Todolist, type DomainTask, type UpdateTaskModel } from '@/features/todolists/api'
import { TaskStatus } from '@/commun/enums/enums'

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodoLists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)

      todolists.forEach(list => {
        tasksApi.getTasks(list.id).then((res) => {
          setTasks((prev) => ({ ...prev, [list.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      setTodolists([res.data.data.item, ...todolists])
      setTasks((prev) => ({ ...prev, [res.data.data.item.id]: [] }))
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => setTodolists(todolists.filter((t) => t.id !== id)))
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi
      .changeTodolistTitle(id, title)
      .then(() => setTodolists(todolists.map((t) => (t.id === id ? { ...t, title } : t))))
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: [res.data.data.item, ...prev[todolistId]]
      }))
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].filter((t) => t.id !== taskId)
      }))
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const model: UpdateTaskModel = {
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate,
      status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
      title: task.title,
      description: task.description
    }

    tasksApi.changeTaskStatus({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((t) => (t.id === task.id ? res.data.data.item : t))
      }))
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const model: UpdateTaskModel = {
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: title,
      description: task.description
    }

    tasksApi.changeTaskTitle({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((t) => (t.id === task.id ? res.data.data.item : t))
      }))
    })
  }

  return (
    <div style={{ margin: '20px' }}>
      <AddItem createItem={createTodolist} label="add" />
      <div style={{ display: 'flex', gap: '20px' }}>
        {todolists.map((todolist: any) => (
          <div key={todolist.id} style={container}>
            <div>
              <EditebleTitle
                title={todolist.title}
                setNewTitle={(title) => changeTodolistTitle(todolist.id, title)}
              />
              <button onClick={() => deleteTodolist(todolist.id)}>x</button>
            </div>
            <AddItem createItem={(title) => createTask(todolist.id, title)} label="add" />
            {tasks[todolist.id]?.map((task: any) => (
              <div key={task.id}>
                <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
                <EditebleTitle title={task.title} setNewTitle={(title) => changeTaskTitle(task, title)} />
                <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}
