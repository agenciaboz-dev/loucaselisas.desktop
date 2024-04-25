import React, { useState } from "react"
import { Avatar, Box, Button, Grid, IconButton, Typography, useMediaQuery } from "@mui/material"
import { Login } from "../components/login/Login"
import destaque from "../assets/login/Frame747.svg"
import logoMarca from "../assets/login/logo_wide.svg"
import logo from "../assets/login/Vector.svg"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import InstagramIcon from "@mui/icons-material/Instagram"
import { FaFacebookF } from "react-icons/fa"
import { MenuHome } from "../components/login/MenuHome"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuMobile } from "../components/login/MenuMobile"
import { paths } from "../paths"
import { MenuMobileDrop } from "../components/login/MenuMobileDrop"
interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation:portrait")
    const [isOpen, setIsOpen] = useState(false)

    const socialUrls = ["https://wa.me/5548999401049", "https://www.instagram.com/loucaselisas/", "https://www.facebook.com/LoucasLisas/"]

    console.log(isOpen)

    return (
        <Box sx={{ width: 1, height: "100vh", py: "2vh" }}>
            {/* {isOpen && <MenuMobile isOpen={isOpen} setIsOpen={setIsOpen} />} */}
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
                <Box justifyContent="space-between" gap={isMobile ? "0.5vw" : "1.5vw"}>
                    <Box flex={isMobile ? 0.9 : 0.2}>
                        <Avatar variant="square" src={logoMarca} sx={{ width: 1, height: 1, objectFit: "contain" }} />
                    </Box>
                    {isMobile ? (
                        <MenuMobileDrop />
                    ) : (
                        // <IconButton
                        //     color={isOpen ? "primary" : "secondary"}
                        //     onClick={() => setIsOpen(!isOpen)}
                        //     sx={{ zIndex: 100, position: isOpen ? "fixed" : "", right: isOpen ? "3vw" : "" }}
                        // >
                        //     <MenuIcon />
                        // </IconButton>
                        <Box flex={0.7} sx={{ justifyContent: "end", gap: "1.8vw" }}>
                            {paths.map((path) => (
                                <MenuHome key={path.link} title={path.title} link={path.link} />
                            ))}
                        </Box>
                    )}
                </Box>

                <Grid container spacing={isMobile ? 8 : 4}>
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
                <Box
                    sx={{
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        gap: isMobile ? "3vw" : "",
                        alignItems: isMobile ? "center" : "",
                    }}
                >
                    <Box gap={isMobile ? "4vw" : "1.5vw"}>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ p: isMobile ? "2vw" : "0.5vw", borderRadius: "30vw", minWidth: 0 }}
                            onClick={() => window.open(socialUrls[0], "_blank")}
                        >
                            <WhatsAppIcon sx={{ fontSize: isMobile ? "1.5rem" : "1.2rem" }} />
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ p: isMobile ? "2vw" : "0.5vw", borderRadius: "30vw", minWidth: 0 }}
                            onClick={() => window.open(socialUrls[1], "_blank")}
                        >
                            <InstagramIcon sx={{ fontSize: isMobile ? "1.5rem" : "1.2rem" }} />
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ p: isMobile ? "2.5vw" : "0.5vw", borderRadius: "30vw", minWidth: 0 }}
                            onClick={() => window.open(socialUrls[2], "_blank")}
                        >
                            <FaFacebookF style={{ fontSize: "1.2rem" }} />
                        </Button>
                    </Box>
                    <Box gap="1vw" sx={{ color: "secondary.main" }}>
                        <Avatar src={logo} sx={{ display: isMobile ? "none" : "", height: "1.5rem", width: "1.5rem" }} />
                        <Typography variant="body1">© 2024 Loucas & Lisas</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
