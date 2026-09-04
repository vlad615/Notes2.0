import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import s from './Login.module.css'

export const Login = () => {
    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To login get registered
                                <a
                                    href="https://social-network.samuraijs.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>
                                <b>Email:</b> free@samuraijs.com
                            </p>
                            <p>
                                <b>Password:</b> free
                            </p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" />
                            <TextField type="password" label="Password" margin="normal" />
                            <FormControlLabel label="Remember me" control={<Checkbox />} />
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}