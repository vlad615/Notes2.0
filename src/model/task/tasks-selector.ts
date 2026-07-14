import type { RootState } from "../../app/store";
import type { TasksType } from "../../layout/todoList/ToDoLists";


export const selectTasks = (state: RootState): TasksType => state.tasks