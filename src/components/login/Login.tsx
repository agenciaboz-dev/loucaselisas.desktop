import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, IconButton, TextField, Typography, useMediaQuery } from "@mui/material"
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
import { useNavigate } from "react-router-dom"
import { KeepSession } from "./KeepSession"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation:portrait)")

    const { onLogin } = useUser()
    const navigate = useNavigate()
    const [errorLogin, setErrorLogin] = useState(false)
    const [keepSession, setKeepSession] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

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
                        .min(3, "Insira um nome de usuário válido, nome muito curto")
                        .max(50, "Insira um nome de usuário válido, nome muito longo")
                        .isValid(value)
                }
            }),

        password: Yup.string().required(required_message),
    })

    const formik = useFormik<LoginForm>({
        initialValues: {
            login: "",
            password: "",
        },

        validationSchema: SignupSchema,

        onSubmit: async (values) => {
            if (loading) return

            setLoading(true)
            const data: LoginForm = {
                login: values.login,
                password: values.password,
            }

            try {
                const response = await api.post("/login/admin", data)
                const user = response.data as User | null

                if (user) {
                    onLogin(user)
                    if (keepSession) {
                        localStorage.setItem("session", JSON.stringify(user))
                    } else {
                        localStorage.setItem("session", JSON.stringify(null))
                    }
                } else {
                    setErrorLogin(true)
                    return
                }
            } catch (error) {
                console.error("Erro ao buscar os dados:", error)
            } finally {
                setLoading(false)
            }
        },
    })

    const handleStayConnected = async (value: boolean) => {
        localStorage.setItem("stay_connected", JSON.stringify(value))
        setKeepSession(value)
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("session")
        if (storedUser) {
            const user = JSON.parse(storedUser || "null") as User | null
            if (user) {
                formik.setFieldValue("login", user.email)
                formik.setFieldValue("password", user.password)
            }
        }

        console.log(JSON.parse(localStorage.getItem("stay_connected") || "null"))

        const stayConnected = JSON.parse(localStorage.getItem("stay_connected") || "null")
        if (stayConnected) {
            setKeepSession(stayConnected)
        }
    }, [])

    return (
        <>
            <KeepSession setLoading={setLoading} />
            <Box
                sx={{
                    height: 1,
                    padding: isMobile ? "5vw" : "1.5vw",
                    pt: 0,
                    gap: "0vw",
                    flexDirection: "column",
                    backgroundColor: "background.default",
                }}
            >
                <Typography
                    variant="subtitle1"
                    component="h1"
                    sx={{ fontSize: isMobile ? "2.2rem" : "4vw", fontWeight: 700, alignSelf: isMobile ? "center" : "flex-start" }}
                >
                    Administrativo
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
                    sx={{ fontSize: isMobile ? "0.8rem" : "1.1rem", mt: "-1.5vw", mb: "1.5vw", alignSelf: isMobile ? "center" : "flex-start" }}
                >
                    Esta área é exclusiva para administradores.
                </Typography>
                <Box sx={{ gap: "0vw", flexDirection: "column", width: 1 }}>
                    {isMobile ? (
                        <Button variant="contained" fullWidth>
                            Abrir Aplicativo
                        </Button>
                    ) : (
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
                                    sx: { gap: "0.5vw", fontSize: "1rem" },
                                    startAdornment: <PersonIcon />,
                                }}
                                InputLabelProps={{ sx: { fontSize: "1rem" } }}
                            />

                            <TextField
                                label="Senha"
                                variant="standard"
                                placeholder="Digite a sua senha"
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
                            {errorLogin && (
                                <Typography variant="body1" component="p" color="error.main">
                                    Usuário ou senha incorretos
                                </Typography>
                            )}
                            <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={keepSession} onChange={(_, checked) => handleStayConnected(checked)} />}
                                        label="Manter Conectado"
                                    />
                                </FormGroup>
                                <Button type="submit" variant="contained" sx={{ borderRadius: 0, width: "30%" }}>
                                    {loading ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Entrar"}
                                </Button>
                            </Box>
                            <Button variant="text" onClick={() => navigate("/confirmacao-de-conta")}>
                                Esqueci a minha senha
                            </Button>
                        </Form>
                    )}
                </Box>
            </Box>
        </>
    )
}
