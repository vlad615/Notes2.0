import type { RootState } from "../../app/store";
import type { ListType } from "../../layout/todoList/components/CardList";


export const selectLists = (state: RootState): ListType[] => state.todoLists