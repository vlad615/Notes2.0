import { PAGE_SIZE } from '@/commun/constants'
import Pagination from '@mui/material/Pagination'
import { type ChangeEvent } from 'react'
import styles from './TasksPagination.module.css'

type Props = {
    totalCount: number
    page: number
    setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
    const changePage = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    return (
        <>
            <Pagination
                count={Math.ceil(totalCount / PAGE_SIZE)}
                page={page}
                onChange={changePage}
                shape="rounded"
                color="primary"
                className={styles.pagination}
            />
        </>
    )
}