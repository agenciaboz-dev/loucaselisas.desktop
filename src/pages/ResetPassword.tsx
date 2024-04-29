import React from "react"
import { Avatar, Box, Button, Paper, Typography, useMediaQuery } from "@mui/material"
import { useParams } from "react-router-dom"
import logoWide from "../assets/login/logo_wide.svg"

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
    const params = useParams()
    const userId: string | undefined = params.user_id
    const created: number | undefined = Number(params.timestamp || 0)

    const isMobile: boolean = useMediaQuery("(orientation:portrait)")

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
                    alignItems: "center",
                    flexDirection: "column",
                    padding: isMobile ? "7vw" : "1vw",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                {!!created ? (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="h1"
                            sx={{ fontSize: isMobile ? "2.47rem" : "4.5rem", lineHeight: isMobile ? "2rem" : "4rem" }}
                        >
                            Defina a nova senha
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="h1"
                            sx={{ fontSize: isMobile ? "2.47rem" : "6rem", lineHeight: isMobile ? "2rem" : "5.5rem" }}
                        >
                            Link Expirado
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ fontSize: "1.2rem" }}>
                            Por favor, solicite a redefinição de senha novamente
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => window.close()}>
                            Sair
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    )
}
