import React, { useState } from "react"
import { Avatar, Box, Button, Paper, TextField, Typography, useMediaQuery } from "@mui/material"
import logoWide from "../assets/login/logo_wide.svg"
import { useFormik } from "formik"
import { api } from "../api/api"
import { Form } from "../components/login/Form"
interface ConfirmAccountProps {}

export const ConfirmAccount: React.FC<ConfirmAccountProps> = ({}) => {
    const isMobile = useMediaQuery<boolean>("(orientation: portrait)")
    const [loading, setLoading] = useState(false)
    const [sendedEmail, setSendedEmail] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            login: "",
        },
        onSubmit: async (values) => {
            if (loading) return
            setLoading(true)

            try {
                console.log(loading)
                const response = await api.post("/user/forgot_password", values)
                console.log(response.data)
                setSendedEmail(true)
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        },
    })

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
                {!!sendedEmail ? (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="h1"
                            sx={{ fontSize: isMobile ? "9.5vw" : "4.9vw", lineHeight: isMobile ? "2.5rem" : "5vw", alignSelf: "center" }}
                        >
                            Redefinir Senha
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                            Um link de redefinição de senha foi enviado para o email digitado caso exista uma conta cadastrada com ele.
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="h1"
                            sx={{ fontSize: isMobile ? "9.5vw" : "4.91vw", lineHeight: isMobile ? "2.5rem" : "5vw", alignSelf: "center" }}
                        >
                            Redefinir Senha
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ fontSize: "1.1rem" }}>
                            Digite o endereço de email para o qual deseja que suas informações de redefinição de senha sejam enviadas
                        </Typography>
                        <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column", gap: isMobile ? "5vw" : "1vw" }}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="standard"
                                placeholder="Digite o email cadastrado"
                                name="login"
                                type="email"
                                value={formik.values.login}
                                onChange={formik.handleChange}
                                error={formik.touched.login && Boolean(formik.errors.login)}
                                helperText={formik.touched.login && formik.errors.login}
                                InputProps={{
                                    sx: { fontSize: "1rem" },
                                }}
                                InputLabelProps={{ sx: { fontSize: "1rem" } }}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ width: isMobile ? "100%" : "auto", alignSelf: isMobile ? "" : "flex-end" }}
                            >
                                Solicitar link de recuperação
                            </Button>
                        </Form>
                    </>
                )}
            </Paper>
        </Box>
    )
}
