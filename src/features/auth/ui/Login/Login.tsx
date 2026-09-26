import { selectIsLoggedIn, setIsLoggedInAC } from '@/app/app-slice'
import { AUTH_TOKEN } from '@/commun/constants'
import { ResultCode } from '@/commun/enums'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { Path } from '@/commun/instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { Navigate } from 'react-router'
import { useLazyCapchaQuery, useLoginMutation } from '../../api/authApi'
import { loginSchema, type LoginInputs } from '../../lib'
import s from './Login.module.css'
import { useState } from 'react'

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useAppDispatch()
    const isLogged = useAppSelector(selectIsLoggedIn)
    const [login] = useLoginMutation()
    const [trigger, { data }] = useLazyCapchaQuery()

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', rememberMe: false, captcha: '' },
    })

    const onSubmit: SubmitHandler<LoginInputs> = (inputs) => {
        login(inputs)
            .unwrap()
            .then((res) => {
                if (res.resultCode === ResultCode.Succeeded) {
                    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
                    localStorage.setItem(AUTH_TOKEN, res.data.token)
                    reset()
                }
            })
    }

    if (isLogged) {
        return <Navigate to={Path.Main} />
    }

    return (
        <Box component={'section'}>
            <Box className={s.wrapper}>
                <FormControl>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="email"
                                        label="Email"
                                        margin="normal"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <FormControl variant="outlined" error={!!errors.password} fullWidth>
                                        <InputLabel htmlFor="password-input">Password</InputLabel>

                                        <OutlinedInput
                                            {...field}
                                            id="password-input"
                                            type={showPassword ? 'text' : 'password'}
                                            label="Пароль"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                            {data?.url && (
                                <>
                                    <img src={data.url} alt="Captcha" />
                                    <Controller
                                        name="captcha"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Captcha"
                                                margin="normal"
                                                fullWidth
                                                error={!!errors.captcha}
                                                helperText={errors.captcha?.message}
                                            />
                                        )}
                                    />
                                </>
                            )}
                            <FormControlLabel
                                label="Remember me"
                                control={
                                    <Controller
                                        name="rememberMe"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                checked={field.value}
                                            />
                                        )}
                                    />
                                }
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </FormGroup>
                    </form>

                    <FormLabel>
                        <p>
                            To login get registered
                            <a href="https://social-network.samuraijs.com" target="_blank" rel="noreferrer">
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
    )
}
