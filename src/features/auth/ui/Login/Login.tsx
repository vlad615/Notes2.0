import { setIsLoggedInAC } from '@/app/app-slice'
import { AUTH_TOKEN } from '@/commun/constants'
import { ResultCode } from '@/commun/enums'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { Path } from '@/commun/instance'
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
import { Navigate } from 'react-router'
import { useLoginMutation } from '../../api/authApi'
import { loginSchema, type LoginInputs } from '../../lib'
import { authSelect } from '../../model/auth-slice'
import s from './Login.module.css'

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogged = useAppSelector(authSelect)
    const [login] = useLoginMutation()

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<LoginInputs>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', rememberMe: false } })

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        login(data).unwrap().then((data) => {
            if (data.resultCode === ResultCode.Succeeded) {
                dispatch(setIsLoggedInAC({ isLoggedIn: true }))
                localStorage.setItem(AUTH_TOKEN, data.data.token)
                reset()
            }
        })
    }

    if (isLogged) {
        return (<Navigate to={Path.Main} />)
    }

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <FormControl>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Controller name='email' control={control} render={({ field }) =>
                                    <TextField {...field} type='email' label='Email' margin='normal'
                                        error={!!errors.email} helperText={errors.email?.message} />}
                                />
                                <Controller name='password' control={control} render={({ field }) =>
                                    <TextField {...field} type='password' label='Password' margin='normal'
                                        error={!!errors.password} helperText={errors.password?.message} />} />
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