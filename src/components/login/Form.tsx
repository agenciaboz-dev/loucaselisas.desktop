import React from 'react'
import {Box, SxProps} from '@mui/material'

interface FormProps {
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode
    sx?: SxProps 
}

export const Form:React.FC<FormProps> = ({ onSubmit, children, sx }) => {
    
    return (
        <Box sx={sx}>
            <form onSubmit={onSubmit}>{children}</form>
        </Box>
    )
}