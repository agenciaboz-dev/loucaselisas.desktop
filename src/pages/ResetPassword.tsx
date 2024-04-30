import React, { useEffect, useState } from "react"
import { Avatar, Box, Button, CircularProgress, IconButton, Paper, TextField, Typography, useMediaQuery } from "@mui/material"
import { useParams } from "react-router-dom"
import logoWide from "../assets/login/logo_wide.svg"
import { useFormik } from "formik"
import { User } from "../types/server/class"
import { api } from "../api/api"
import * as Yup from "yup"
import { Form } from "../components/login/Form"
import KeyIcon from "@mui/icons-material/Key"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { red } from "@mui/material/colors"

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
    const params = useParams()
    const userId: string | undefined = params.user_id
    const created: number | undefined = Number(params.timestamp || 0)
    const expiredLink: boolean = isNaN(created) ? true : new Date().getTime() - created >= 24 * 60 * 60 * 1000
    const [showPassword, setShowPassword] = useState(false)

    var timestamp = new Date().getTime()
    console.log(timestamp)

    const [pass2, setPass2] = useState<string>("")
    const [samePassword, setsamePassword] = useState(true)

    const isMobile: boolean = useMediaQuery("(orientation:portrait)")

    const [loading, setLoading] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<boolean>(false)

    const required_message = "Campo obrigatório"
    const newPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Senha precisa ter pelo menos 8 caracteres")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Senha precisa conter pelo menos uma letra maiúscula, uma letra minúscula e um número ."
            )
            .required(required_message),
    })

    const formik = useFormik<Partial<User>>({
        initialValues: { password: "", id: userId },

        validationSchema: newPasswordSchema,

        onSubmit: async (values) => {
            if (loading) return
            if (values.password !== pass2) {
                setsamePassword(false)
                return
            }
            setLoading(true)

            try {
                await api.patch("/user", values)
                setNewPassword(true)
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
                    alignItems: "center",
                    flexDirection: "column",
                    padding: isMobile ? "7vw" : "1vw",
                    gap: isMobile ? "5vw" : "1vw",
                }}
            >
                {expiredLink ? (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="h1"
                            sx={{ fontSize: isMobile ? "2.47rem" : "5.5rem", lineHeight: isMobile ? "2rem" : "4.5rem" }}
                        >
                            Link Expirado
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
                            Por favor, solicite a redefinição de senha novamente
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => window.close()}>
                            Sair
                        </Button>
                    </>
                ) : newPassword ? (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="h1"
                            sx={{ fontSize: isMobile ? "1.7rem" : "4rem", lineHeight: isMobile ? "1.3rem" : "3.5rem" }}
                        >
                            Nova senha definida
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ fontSize: "1.2rem" }}>
                            Senha alterada com sucesso
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => window.close()}>
                            Sair
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="subtitle1"
                            component="h1"
                            sx={{ fontSize: isMobile ? "1.7rem" : "3.2rem", lineHeight: isMobile ? "" : "3rem" }}
                        >
                            Defina a nova senha
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
                            Digite uma nova senha.
                        </Typography>
                        <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column", gap: "2vw" }}>
                            <TextField
                                label="Nova Senha"
                                variant="standard"
                                placeholder="Digite a nova senha"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    sx: { gap: "0.5vw", fontSize: "1rem" },
                                    startAdornment: <KeyIcon />,
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    ),
                                }}
                                InputLabelProps={{ sx: { fontSize: "1rem" } }}
                            />
                            <TextField
                                label="Nova Senha"
                                variant="standard"
                                placeholder="Digite a nova senha"
                                name="password2"
                                type={showPassword ? "text" : "password"}
                                value={pass2}
                                onChange={(e) => setPass2(e.target.value)}
                                InputProps={{
                                    sx: { gap: "0.5vw", fontSize: "1rem" },
                                    startAdornment: <KeyIcon />,
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    ),
                                }}
                                InputLabelProps={{ sx: { fontSize: "1rem" } }}
                            />
                            {!samePassword && <Typography color="error">As senhas não conferem</Typography>}
                            <Button variant="contained" type="submit">
                                {loading ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Alterar Senha"}
                            </Button>
                        </Form>
                    </>
                )}
            </Paper>
        </Box>
    )
}
