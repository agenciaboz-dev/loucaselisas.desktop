import { Box, Paper, Typography } from "@mui/material"
import { MenuPrincipal } from "../components/menus/Menu"


interface PageLayoutProps {
    children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ m: "3vw", flex: 1, height: "87vh", overflow: "hidden" }}>
            <Box
                sx={{
                    width: 1,
                    backgroundColor: "background.default",
                }}
            >
                <MenuPrincipal />
                <Box sx={{ p: "1.5vw", flex: 1 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            flex: 1,
                            height: 1,
                            width: "75vw",
                            flexDirection: "column",
                            backgroundColor: "background.paper",
                            p: "1vw 1.5vw 0",
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ width: "100%" }}>{children}</Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}
