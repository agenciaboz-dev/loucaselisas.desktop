import React from "react"
import { Avatar, Box, Button, Paper, Typography, useMediaQuery } from "@mui/material"
import logoWide from "../assets/login/logo_wide.svg"
import { SocialMediaFooter } from "./social-medias/SocialMediaFooter"
import { useNavigate } from "react-router-dom"

interface Page404Props {
    text?: string
}

export const Page404: React.FC<Page404Props> = ({ text = "Erro 404, para retornar à página principal clique no botão abaixo" }) => {
    const isMobile: boolean = useMediaQuery("(orientation:portrait)")
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                flex: 1,
                height: "100vh",
                overflow: "hidden",
                px: isMobile ? "10vw" : "32vw",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
            <Avatar src={logoWide} variant="square" sx={{ height: "auto", width: "100%" }} />

            <Paper
                sx={{
                    width: 1,
                    height: "fit-content",
                    backgroundColor: "background.default",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: isMobile ? "7vw" : "1vw",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                <>
                    <Typography
                        variant="subtitle1"
                        component="h1"
                        sx={{ fontSize: isMobile ? "11vw" : "3.4vw", lineHeight: isMobile ? "2rem" : "3.4vw" }}
                    >
                        Pagina não encontrada
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ fontSize: isMobile ? "1rem" : "1.2rem", textAlign: "center" }}>
                        {text}
                    </Typography>
                    <Button variant="contained" sx={{ fontSize: "1.1rem" }} onClick={() => navigate("/")}>
                        Voltar à página principal
                    </Button>
                </>
            </Paper>
            <SocialMediaFooter sx={{ marginTop: "2vw" }} />
        </Box>
    )
}
