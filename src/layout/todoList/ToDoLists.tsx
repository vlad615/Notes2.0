import { CardsList } from "./CardsList";
import s from "./ToDoLists.module.css"
import { Form } from "./components/Form";
import { Box } from "@mui/material";

export const ToDoLists = () => {
    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <Form />
                    <Box className={s.tasksWrapper}>
                        <CardsList />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}