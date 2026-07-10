import type { ListType } from "./layout/todoList/components/CardList";
import { ToDoLists, type TasksType } from "./layout/todoList/ToDoLists"
import "./styles/index.css"

const task1 = crypto.randomUUID()
const task2 = crypto.randomUUID()

const toDoLists: ListType[] = [
  {
    id: task1,
    title: "Programing",
    filter: "all"
  },
  {
    id: task2,
    title: "To be happy",
    filter: "all"
  },
]

const tasks: TasksType =
{
  [task1]: [
    { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
    { id: crypto.randomUUID(), title: 'JS', isDone: true },
    { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
  ],

  [task2]: [
    { id: crypto.randomUUID(), title: 'Hello world', isDone: true },
    { id: crypto.randomUUID(), title: 'I am Happy', isDone: false },
    { id: crypto.randomUUID(), title: 'Yo', isDone: false },]

}

export function App() {

  return (
    <>
      <ToDoLists list={toDoLists} tasks={tasks} />
    </>
  )
}

