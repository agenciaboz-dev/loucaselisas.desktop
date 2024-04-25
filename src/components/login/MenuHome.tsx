import React from "react"
import { Button, Typography } from "@mui/material"

interface MenuHomeProps {
    title: string
    link: string
}

export const MenuHome: React.FC<MenuHomeProps> = ({ title, link }) => {
    return (
        <>
            <Button variant="text" color="secondary" onClick={() => window.open(link, "_blank")}>
                <Typography variant="body2" component="p" sx={{ fontSize: "1.3rem" }}>
                    {title}
                </Typography>
            </Button>
        </>
    )
}
