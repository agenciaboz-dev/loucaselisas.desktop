import React from "react"
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

interface IMenuOption {
    label: string
    path: string
    icon: React.ReactNode
}

interface MenuItemProps {
    menuOption: IMenuOption
}

export const MenuItem: React.FC<MenuItemProps> = ({ menuOption }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const active = location.pathname.split("/")[1] == menuOption.path.split("/")[1]
    return (
        <Box>
            {active && <Box sx={{ height: "auto", width: "6px", backgroundColor: "primary.main", borderRadius: "0 5px 5px 0", zIndex: 100 }} />}
            <ListItemButton
                key={menuOption.path}
                onClick={() => navigate(menuOption.path)}
                sx={{ backgroundColor: active ? "secondary.main" : "", ml: active ? "-6px" : "" }}
            >
                <ListItemIcon>{menuOption.icon}</ListItemIcon>
                <ListItemText>
                    <Typography variant="h2" component="h2" sx={{ ml: "-1vw", textTransform: "uppercase" }}>
                        {menuOption.label}
                    </Typography>
                </ListItemText>
            </ListItemButton>
        </Box>
    )
}
