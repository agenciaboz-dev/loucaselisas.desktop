import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { MenuPrincipal } from "../components/dashboard/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate();
    // const theme = useTheme()

    return (
        <Box sx={{ p: "4vw", flex: 1, height: 1 }}>
            <Box
                sx={{
                    width: 1,
                    backgroundColor: "background.default",
                    gap: "1vw",
                }}
            >
                <MenuPrincipal />
                <Box
                    sx={{
                        flex: 1,
                        height: 1,
                        flexDirection: "column",
                        backgroundColor: "background.paper",
                        p: "0.5vw",
                    }}
                >
                    <Box sx={{ alignItems: "center" }}>
                        <Typography
                            flex={1}
                            variant="h2"
                            component="h1"
                            fontSize="1.5rem"
                        >
                            {title}
                        </Typography>
                        <Button
                            endIcon={<LogoutIcon />}
                            onClick={() => navigate("/")}
                        >
                            SAIR
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: 1,
                            height: "calc(100vh - 8vw)",
                            overflow: "auto",
                            border: "1px solid red"
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
