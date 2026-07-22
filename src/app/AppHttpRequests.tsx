import { type ChangeEvent, type CSSProperties, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { AddItem, EditebleTitle } from '@/commun/components/'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import type { Todolist } from '@/features/todolists/api/todolistsApi.types'



export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
    todolistsApi.getTodoLists().then(res => setTodolists(res.data))
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then(res => setTodolists([res.data.data.item, ...todolists]))
   }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => setTodolists(todolists.filter(t => t.id !== id)))
   }

  const changeTodolistTitle = (id: string, title: string) => { 
    todolistsApi.changeTodolistTitle(id, title).then(() => setTodolists(todolists.map(t => t.id === id ? {...t, title} : t)))
  }

  const createTask = (todolistId: string, title: string) => { }

  const deleteTask = (todolistId: string, taskId: string) => { }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => { }

  const changeTaskTitle = (task: any, title: string) => { }

  return (
    <div style={{ margin: '20px' }}>
      <AddItem createItem={createTodolist} label='add' />
      {todolists.map((todolist: any) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditebleTitle title={todolist.title}
              setNewTitle={title => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <AddItem createItem={title => createTask(todolist.id, title)} label='add' />
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox checked={task.isDone}
                onChange={e => changeTaskStatus(e, task)} />
              <EditebleTitle title={task.title}
                setNewTitle={title => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
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
