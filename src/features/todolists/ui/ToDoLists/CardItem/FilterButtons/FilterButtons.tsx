import { Button } from '@/commun/components'
import { useAppDispatch } from '@/commun/hooks'
import type { ListType } from '@/features/todolists/api'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useCallback } from 'react'

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

const styleGroup = { marginBottom: '10px' }

export const FilterButtons = ({ id, filter }: Props) => {


    return (
        <ButtonGroup sx={styleGroup} aria-label="Medium-sized button group">
            <Button primary={filter === 'all' ? true : false} name="All" />
            <Button
                primary={filter === 'active' ? true : false}
                name="Active"

            />
            <Button
                primary={filter === 'completed' ? true : false}
                name="Completed"

            />
        </ButtonGroup>
    )
}
