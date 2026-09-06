import { Button } from '../Button/Button'
import s from './PageNotFound.module.css'

export const PageNotFound = () => {
    return (
        <div className={s.wrapper}>
            <h1>Page Not Found</h1>
            <Button name='Main page' primary to='/' />
        </div>

    )
}