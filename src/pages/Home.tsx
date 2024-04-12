import React from "react"
import { Avatar, Box, Button, Grid } from "@mui/material"
import { Login } from "../components/login/Login"
import destaque from "../assets/login/Frame747.svg"
import logoMarca from "../assets/login/logo_wide.svg"
import logo from "../assets/login/Vector.svg"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
        <Box sx={{ width: 1, height: 1, backgroundColor: "primary.main" }}>
            <Box
                sx={{
                    width: "75vw",
                    height: 1,
                    margin: "0 auto",
                    padding: "5vw 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5vw",
                }}
            >
                <Box justifyContent="space-between" gap="1.5vw">
                    <Box flex={0.2}>
                        <Avatar variant="square" src={logoMarca} sx={{ width: 1, height: 1, objectFit: "contain" }} />
                    </Box>
                    <Box flex={0.7} sx={{justifyContent:"end", gap:"0.8vw"}}>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem", }}>Inicio</Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem", }}>Produtos</Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem", }}>Sobre</Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem", }}>Portfolio</Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem", }}>Academia</Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem", }}>Contato</Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem", }}>Comprar</Button>
                    </Box>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={7}>
                        <Avatar variant="square" src={destaque} sx={{ width: 1, height: 1, objectFit: "contain" }} />
                    </Grid>
                    <Grid item xs={5}>
                        <Login />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
