import React from "react"
import { Avatar, Box, Button, Grid, IconButton, Typography, useMediaQuery } from "@mui/material"
import { Login } from "../components/login/Login"
import destaque from "../assets/login/Frame747.svg"
import logoMarca from "../assets/login/logo_wide.svg"
import logo from "../assets/login/Vector.svg"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import InstagramIcon from "@mui/icons-material/Instagram"
import { FaFacebookF } from "react-icons/fa"
import { MenuHome } from "../components/login/MenuHome"
interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation:portrait")

    const paths = [
        { title: "Inicio", link: "https://www.loucaselisas.com.br/" },
        { title: "Produtos", link: "https://www.loucaselisas.com.br/produtos" },
        { title: "Sobre", link: "https://www.loucaselisas.com.br/sobre" },
        { title: "Portfolio", link: "https://www.loucaselisas.com.br/_files/ugd/0914c1_e7d129ccd4cc41829f4cb9256d2cef92.pdf?index=true" },
        { title: "Academia", link: "https://www.loucaselisas.com.br/academia" },
        { title: "Contato", link: "https://www.loucaselisas.com.br/contato" },
        { title: "Comprar", link: "https://www.loucaselisas.com.br/comprar" },
    ]

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
                    justifyContent: isMobile ? "" : "space-between",
                    gap: isMobile ? 4 : "",
                }}
            >
                <Box justifyContent="space-between" gap={isMobile ? "0.5vw" : "1.5vw"}>
                    <Box flex={isMobile ? 0.6 : 0.2}>
                        <Avatar variant="square" src={logoMarca} sx={{ width: 1, height: 1, objectFit: "contain" }} />
                    </Box>
                    {!isMobile && (
                        <Box flex={0.7} sx={{ justifyContent: "end", gap: "1.8vw" }}>
                            {paths.map((path) => (
                                <MenuHome key={path.link} title={path.title} link={path.link} />
                            ))}
                        </Box>
                    )}
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={isMobile ? 12 : 7}>
                        <Avatar
                            variant="square"
                            src={destaque}
                            sx={{
                                width: 1,
                                height: 1,
                                objectFit: "fill",
                            }}
                        />
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 5}>
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
