import { Box, Paper, Typography } from "@mui/material"
import { MenuPrincipal } from "../components/menus/Menu"
import { version } from "../tools/appVersion"

interface PageLayoutProps {
    children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <>
            <Typography sx={{ position: "fixed", bottom: "8px", right: "8px", color: "#ff0000", fontSize: "1.2rem" }}>v: {version}</Typography>
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
                                pt: "0.8vw",
                            }}
                        >
                            <Box>{children}</Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
