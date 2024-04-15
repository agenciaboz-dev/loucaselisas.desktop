import React from "react"
import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material"
import { Login } from "../components/login/Login"
import destaque from "../assets/login/Frame747.svg"
import logoMarca from "../assets/login/logo_wide.svg"
import logo from "../assets/login/Vector.svg"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import InstagramIcon from "@mui/icons-material/Instagram"
import { FaFacebookF } from "react-icons/fa"
interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
        <Box sx={{ width: 1, height: "100vh" }}>
            <Box
                sx={{
                    width: "75vw",
                    height: 1,
                    margin: "0 auto",
                    padding: "5vw 0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box justifyContent="space-between" gap="1.5vw">
                    <Box flex={0.2}>
                        <Avatar variant="square" src={logoMarca} sx={{ width: 1, height: 1, objectFit: "contain" }} />
                    </Box>
                    <Box flex={0.7} sx={{ justifyContent: "end", gap: "1.8vw" }}>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem" }}>
                            Inicio
                        </Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem" }}>
                            Produtos
                        </Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem" }}>
                            Sobre
                        </Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem" }}>
                            Portfolio
                        </Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem" }}>
                            Academia
                        </Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem" }}>
                            Contato
                        </Button>
                        <Button variant="text" color="secondary" sx={{ fontSize: "1.2rem" }}>
                            Comprar
                        </Button>
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
                <Box sx={{ justifyContent: "space-between" }}>
                    <Box gap="1.5vw">
                        <IconButton sx={{ backgroundColor: "secondary.main", color: "primary.main" }}>
                            <WhatsAppIcon sx={{ fontSize: "1.2rem" }} />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: "secondary.main", color: "primary.main" }}>
                            <InstagramIcon sx={{ fontSize: "1.2rem" }} />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: "secondary.main", color: "primary.main" }}>
                            <FaFacebookF style={{ fontSize: "1.2rem" }} />
                        </IconButton>
                    </Box>
                    <Box gap="1vw" sx={{ color: "secondary.main" }}>
                        <Avatar src={logo} sx={{ height: "1.5rem", width: "1.5rem" }} />
                        <Typography variant="body1">© 2024 Loucas & Lisas</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
