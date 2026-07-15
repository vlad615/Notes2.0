import type { RootState } from "../../app/store";
import type { TasksType } from "./tasks-reducer";


export const selectTasks = (state: RootState): TasksType => state.tasks