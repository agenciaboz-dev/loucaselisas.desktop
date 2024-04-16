import React from "react";
import { Box, Button, Paper, TextField, Typography, useTheme } from "@mui/material"
import { MenuPrincipal } from "../components/menus/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import { useNavigate } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
interface PageLayoutProps {
    children: React.ReactNode
    title?: string
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate()
    const theme = useTheme()
    return (
        <Box sx={{ m: "4vw", flex: 1, height: "86vh", overflow: "hidden" }}>
            <Box
                sx={{
                    width: 1,
                    backgroundColor: "background.default",
                }}
            >
                <MenuPrincipal />
                <Box sx={{ p: "1.8vw", flex: 1 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            flex: 1,
                            height: 1,
                            flexDirection: "column",
                            backgroundColor: "background.paper",
                            p: "1.5vw",
                        }}
                    >
                        <Box sx={{ alignItems: "center" }}>
                            <Typography flex={1} variant="h2" component="h1" fontSize="1.5rem">
                                {title}
                            </Typography>
                            <Button endIcon={<LogoutIcon />} onClick={() => navigate("/")}>
                                SAIR
                            </Button>
                        </Box>
                        <Box>
                            <TextField
                                placeholder="Explorar"
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: <MenuIcon />,
                                    endAdornment: <SearchIcon />,
                                    sx: { gap: "1vw", borderRadius: "2vw", backgroundColor: "secondary.main" },
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: 1,
                                overflowY: "auto",
                                border: "1px solid red",
                                pt: "1vw",
                            }}
                        >
                            {children}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}
