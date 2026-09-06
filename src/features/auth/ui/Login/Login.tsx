import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { loginSchema, type LoginInputs } from '../../lib'
import s from './Login.module.css'

export const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<LoginInputs>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', rememberMe: false } })

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        console.log(data);
        reset()

    }

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <FormControl>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Controller name='password' control={control} render={({ field }) =>
                                    <TextField type='email' label='Email' margin='normal'
                                        helperText={errors && errors.email?.message} onChange={(e) => { field.onChange(e.target.value) }} />}
                                />
                                <Controller name='password' control={control} render={({ field }) =>
                                    <TextField type='password' label='Password' margin='normal'
                                        helperText={errors && errors.password?.message} onChange={(e) => { field.onChange(e.target.value) }} />} />
                                <FormControlLabel label="Remember me" control={
                                    <Controller name="rememberMe" control={control} render={({ field }) =>
                                        <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />}
                                    />}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Login
                                </Button>
                            </FormGroup>
                        </form>


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
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}