import { ThemeProvider } from "@mui/material"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { usemuiTheme } from "../../hooks/useMuiTheme"
import { UserProvider } from "../../contexts/UserContext"
import { TimeInstantProvider } from "../../contexts/TimeInstantContext"

interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const theme = usemuiTheme()

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <TimeInstantProvider>{children}</TimeInstantProvider>
                </UserProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}
