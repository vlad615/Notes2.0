import { Button } from '@/commun/components'
import { useAppDispatch } from '@/commun/hooks'
import type { ListType } from '@/features/todolists/api'
import { changeTodolistFilterAC } from '@/features/todolists/model'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useCallback } from 'react'

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

const styleGroup = { marginBottom: '10px' }

export const FilterButtons = ({ id, filter }: Props) => {
    const dispatch = useAppDispatch()

    function updateListFilter(id: ListType['id'], filter: ListType['filter']) {
        dispatch(changeTodolistFilterAC({ id, filter }))
    }

    const setAllFilter = useCallback(() => {
        updateListFilter(id, 'all')
    }, [dispatch, id])
    const setActiveFilter = useCallback(() => {
        updateListFilter(id, 'active')
    }, [dispatch, id])
    const setCompletedFilter = useCallback(() => {
        updateListFilter(id, 'completed')
    }, [dispatch, id])

    return (
        <ButtonGroup sx={styleGroup} aria-label="Medium-sized button group">
            <Button primary={filter === 'all' ? true : false} name="All" callBack={setAllFilter} />
            <Button
                primary={filter === 'active' ? true : false}
                name="Active"
                callBack={setActiveFilter}
            />
            <Button
                primary={filter === 'completed' ? true : false}
                name="Completed"
                callBack={setCompletedFilter}
            />
        </ButtonGroup>
    )
}
