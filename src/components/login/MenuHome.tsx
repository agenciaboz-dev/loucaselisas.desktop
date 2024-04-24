import React from "react"
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface MenuHomeProps {
    title: string
    link: string
}

export const MenuHome: React.FC<MenuHomeProps> = ({ title, link }) => {
    const navigate = useNavigate()

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
