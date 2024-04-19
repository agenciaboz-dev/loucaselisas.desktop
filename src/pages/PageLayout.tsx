import { Box, Paper } from "@mui/material"
import { MenuPrincipal } from "../components/menus/Menu"

interface PageLayoutProps {
    children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
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
                        <Box sx={{ border: "1px solid red", flex: 1 }}>{children}</Box>
                        {/* 
                            <Box>
                                <Filters />
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
                            </Box> */}
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}
