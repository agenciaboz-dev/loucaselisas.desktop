import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { MenuPrincipal } from "../components/menus/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import { useNavigate } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { RefreshButton } from "../components/RefreshButtton"

interface PageLayoutProps {
    children: React.ReactNode
    title?: string
    refreshCallback: () => void
    carregando: boolean
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title, refreshCallback, carregando }) => {
    const navigate = useNavigate()

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
                        <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ alignItems: "center", gap: "0.7vw", mb: 1 }}>
                                <Typography variant="h2" component="h1" fontSize="1.5rem">
                                    {title}
                                </Typography>
                                <RefreshButton carregando={carregando} callBack={refreshCallback} />
                            </Box>

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
