import { useAppDispatch, useAppSelector } from '@/commun/hooks';
import Alert from '@mui/material/Alert';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import { selectError, changeErrorStatus } from '@/app/app-slice'
import * as React from 'react';

const alertStyle = { width: '100%' }
export const ErrorAlert = () => {
    const error = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') return

        dispatch(changeErrorStatus({ error: null }));
    };

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={alertStyle}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}