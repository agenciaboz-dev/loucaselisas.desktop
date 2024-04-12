import React, { useState } from 'react'
import {Box, Button, CircularProgress, IconButton, TextField, Typography} from '@mui/material'
import { Form } from './Form'
import { useFormik } from "formik"
import { LoginForm } from '../../types/server/login'

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import PersonIcon from "@mui/icons-material/Person"
import KeyIcon from "@mui/icons-material/Key"

interface LoginProps {
    
}

export const Login: React.FC<LoginProps> = ({ }) => {
    
    const formik = useFormik<LoginForm>({
        initialValues: {
            login: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values)
        },
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    
    return (
        
            <Box sx={{ height: 1, width: 1, padding:"1.5vw", gap: "2vw", flexDirection: "column", backgroundColor: "background.default" }}>
            <Typography variant="h1" component="h1" sx={{fontSize:"3rem"}}>
                Administrativo
            </Typography>
            <Typography variant="body1" component="p">
                Esta área é exclusiva para administradores.
            </Typography>
            <Box sx={{ gap: "2vw", flexDirection: "column" }}>
                <Form onSubmit={formik.handleSubmit} sx={{ height: 1, flexDirection: "column", gap:"2vw"}}>
                    <TextField
                        label="Usuário ou Email"
                        variant="standard"
                        placeholder="Digite seu usuário ou o seu email "
                        name="login"
                        value={formik.values.login}
                        onChange={formik.handleChange}
                        required
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
                        required
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
                    <Box sx={{justifyContent:"end"}}>

                    <Button type="submit" variant="contained" sx={{borderRadius:0, width: "30%"}}>
                        {loading ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Entrar"}
                    </Button>
                    </Box>
                </Form>
            </Box>
        </Box>
        
    )
}