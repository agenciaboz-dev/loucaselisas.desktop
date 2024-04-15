import React from "react"
import { Box, Button, Typography, useTheme } from "@mui/material"
import { MenuPrincipal } from "../components/dashboard/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import { useNavigate } from "react-router-dom"

interface PageLayoutProps {
    children: React.ReactNode
    title?: string
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <Box sx={{ p: "4vw", flex: 1, height: 1 }}>
            <Box sx={{ width: 1, backgroundColor: "#00ff00", gap: "1vw" }}>
                {/* <MenuPrincipal /> */}
                <Box sx={{ flex: 1, height: 1, overflow: "auto", backgroundColor: "#fff", flexDirection: "column" }}>
                    <Box sx={{ p: "0.5vw 1vw" }}>
                        <Typography flex={1}>{title}</Typography>
                        <Button endIcon={<LogoutIcon />} onClick={() => navigate("/")} sx={{ alignItems: "center", justifyContent: "center" }}>
                            SAIR
                        </Button>
                    </Box>
                    <Box sx={{ flex: 1, color: "red", height: 1, ml: theme.spacing(20) }}>{children}</Box>
                </Box>
            </Box>
        </Box>
    )
}
