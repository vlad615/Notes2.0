import { useAppDispatch } from "@/commun/hooks"
import { changeTodolistFilterAC, type ListType } from "@/features/todolists/model"
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from "@/commun/components";

type Props = {
    id: ListType["id"]
    filter: ListType["filter"]
}

export const FilterButtons = ({ id, filter }: Props) => {
    const dispatch = useAppDispatch()

    function updateListFilter(id: ListType["id"], filter: ListType["filter"]) {
        dispatch(changeTodolistFilterAC({ id, filter }))
    }
    return (
        <ButtonGroup sx={{ marginBottom: '10px' }} aria-label="Medium-sized button group">
            <Button primary={filter === "all" ? true : false}
                name="All"
                callBack={() => updateListFilter(id, "all")} />
            <Button primary={filter === "active" ? true : false}
                name="Active"
                callBack={() => updateListFilter(id, "active")} />
            <Button primary={filter === "completed" ? true : false}
                name="Completed"
                callBack={() => updateListFilter(id, "completed")} />
        </ButtonGroup>
    )
}