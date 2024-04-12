import { ThemeProvider } from '@mui/material'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { usemuiTheme } from '../../hooks/useMuiTheme'

interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {

    const theme = usemuiTheme()
    
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            {children}
            </ThemeProvider>
            
        </BrowserRouter>
    )
}