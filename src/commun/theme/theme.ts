import { createTheme } from '@mui/material/styles'
import type { ThemeMode } from '@/app/app-slice'

const primaryColor = '#A78BFA'

export function getTheme(theme: ThemeMode) {
    const baseTheme = {
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${primaryColor} transparent`,
                    },
                    '*': {
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${primaryColor} transparent`,
                    },
                    '*::-webkit-scrollbar': {
                        width: 3,
                        height: 3,
                    },
                    '*::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: `${primaryColor}`,
                        borderRadius: 999,
                        '&:hover': {
                            backgroundColor: `${primaryColor}`,
                        },
                    },
                },
            },
        },
    }

    switch (theme) {
        case 'dark':
            return createTheme({
                palette: {
                    mode: 'dark',
                    background: {
                        default: '#0B1220',
                        paper: '#111827',
                    },
                    primary: {
                        main: `${primaryColor}`,
                    },
                    text: {
                        primary: '#F9FAFB',
                        secondary: '#E5E7EB',
                    },
                },
                ...baseTheme,
            })
        case 'light':
            return createTheme({
                palette: {
                    mode: 'light',
                    background: {
                        default: '#F5F7FB',
                        paper: '#FFF',
                    },
                    primary: {
                        main: `${primaryColor}`,
                    },
                    text: {
                        primary: '#1F2937',
                        secondary: '#374151',
                    },
                },
                ...baseTheme,
            })
    }
}
