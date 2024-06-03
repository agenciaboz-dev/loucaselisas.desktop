import React from "react"
import { Avatar, Box, SxProps, Typography, useMediaQuery } from "@mui/material"
import { socialMediaData } from "./socialMediaData"
import { SocialMediaButon } from "./SocialMediaButton"
import logo from "../../assets/login/Vector.svg"

interface SocialMediaFooterProps {
    sx?: SxProps
}

export const SocialMediaFooter: React.FC<SocialMediaFooterProps> = ({ sx }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", alignItems: "center", ...sx }}>
            <Box sx={{ gap: "1vw" }}>
                {socialMediaData.map((socialMedia) => (
                    <SocialMediaButon key={socialMedia.link} link={socialMedia.link} Icon={socialMedia.Icon} ReactIcon={socialMedia.ReactIcon} />
                ))}
            </Box>
            <Box gap="0.7vw" sx={{ color: "secondary.main" }}>
                <Avatar src={logo} sx={{ height: "1.5rem", width: "1.5rem" }} />
                <Typography variant="body1">© 2024 Loucas & Lisas</Typography>
            </Box>
        </Box>
    )
}
