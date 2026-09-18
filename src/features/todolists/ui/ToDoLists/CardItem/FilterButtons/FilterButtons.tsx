import { Button } from '@/commun/components'
import { useAppDispatch } from '@/commun/hooks'
import { todolistsApi, type Filter, type ListType } from '@/features/todolists/api'
import ButtonGroup from '@mui/material/ButtonGroup'

type Props = {
    id: ListType['id']
    filter: Filter
}

const styleGroup = { marginBottom: '10px' }

export const FilterButtons = ({ id, filter }: Props) => {
    const dispatch = useAppDispatch()

    const changeFilter = (filter: Filter) => {
        dispatch(todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
            const todolist = todolists.find((todolist) => todolist.id === id)
            if (todolist) {
                todolist.filter = filter
            }
        }))
    }

    return (
        <ButtonGroup sx={styleGroup} aria-label="Medium-sized button group">
            <Button primary={filter === 'all' ? true : false} name="All" callBack={() => changeFilter('all')} />
            <Button primary={filter === 'active' ? true : false} name="Active" callBack={() => changeFilter('active')} />
            <Button primary={filter === 'completed' ? true : false} name="Completed" callBack={() => changeFilter('completed')} />
        </ButtonGroup>
    )
}
