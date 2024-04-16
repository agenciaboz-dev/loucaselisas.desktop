import React, { useState } from "react"
import { Box, Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material"
import { Form } from "./Form"
import { useFormik } from "formik"
import { LoginForm } from "../../types/server/login"
import * as Yup from "yup"

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import PersonIcon from "@mui/icons-material/Person"
import KeyIcon from "@mui/icons-material/Key"
import { api } from "../../api/api"
import { User } from "../../types/server/class"
import { useUser } from "../../hooks/useUser"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const { onLogin } = useUser()
    const [errorLogin, setErrorLogin] = useState(false)

    const required_message = "Campo obrigatório"

    const SignupSchema = Yup.object().shape({
        login: Yup.string()
            .required(required_message)
            .test("is-valid-login", "Insira um nome de usuário válido ou um e-mail válido", async (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (emailRegex.test(value)) {
                    return Yup.string().email("E-mail inválido").isValid(value)
                } else {
                    return Yup.string()
                        .min(3, "Insira um nome válido, nome muito curto")
                        .max(50, "Insira um nome válido, nome muito longo")
                        .isValid(value)
                }
            }),

        password: Yup.string()
            .min(8, "Senha precisa ter pelo menos 8 caracteres")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                "Senha precisa conter pelo menos uma letra maiúscula, uma letra minúscula e um número."
            )
            .required(required_message),
    })

    const formik = useFormik<LoginForm>({
        initialValues: {
            login: "",
            password: "",
        },

        validationSchema: SignupSchema,

        onSubmit: async (values) => {
            console.log(values)

            if (loading) return

            setLoading(true)
            const data: LoginForm = {
                login: values.login,
                password: values.password,
            }

            try {
                const response = await api.post("/login/admin", data)
                console.log(response.data)
                const user = response.data as User | null

                if (!user) {
                    setErrorLogin(true)
                    return
                }

                onLogin(user)
            } catch (error) {
                console.error("Erro ao buscar os dados:", error)
            } finally {
                setLoading(false)
            }
        },
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <Box sx={{ height: 1, width: 1, padding: "1.5vw", gap: "2vw", flexDirection: "column", backgroundColor: "background.default" }}>
            <Typography variant="h1" component="h1" sx={{ fontSize: "3rem" }}>
                Administrativo
            </Typography>
            <Typography variant="body1" component="p">
                Esta área é exclusiva para administradores.
            </Typography>
            <Box sx={{ gap: "2vw", flexDirection: "column" }}>
                <Form onSubmit={formik.handleSubmit} sx={{ height: 1, flexDirection: "column", gap: "2vw" }}>
                    <TextField
                        label="Usuário ou Email"
                        variant="standard"
                        placeholder="Digite seu usuário ou o seu email "
                        name="login"
                        value={formik.values.login}
                        onChange={formik.handleChange}
                        error={formik.touched.login && Boolean(formik.errors.login)}
                        helperText={formik.touched.login && formik.errors.login}
                        InputProps={{
                            sx: { gap: "0.5vw" },
                            startAdornment: <PersonIcon />,
                        }}
                    />

                    <TextField
                        label="Senha"
                        variant="standard"
                        placeholder="Digite a sua senha"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            sx: { gap: "0.5vw" },
                            startAdornment: <KeyIcon />,
                            endAdornment: (
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                    {errorLogin && <Typography color="error.main">Usuário ou senha incorretos</Typography>}
                    <Box sx={{ justifyContent: "end" }}>
                        <Button type="submit" variant="contained" sx={{ borderRadius: 0, width: "30%" }}>
                            {loading ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Entrar"}
                        </Button>
                    </Box>
                </Form>
            </Box>
        </Box>
    )
}
