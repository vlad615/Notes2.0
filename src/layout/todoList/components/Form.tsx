import { AddItem } from "../../../components/AddItem"
import type { ListType } from "./CardList"
import s from "./Form.module.css"

type Props = {
    createList: (title: ListType["title"]) => void
}

export const Form = ({ createList }: Props) => {

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Add a new to-do list</h2>
            <div className={s.inputsWrapper}>
                <AddItem createItem={createList} label="Name of List..." primary />
            </div>

        </div>
    )
}