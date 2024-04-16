import React from "react";
import { Avatar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useTheme } from "@mui/material"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import GroupIcon from "@mui/icons-material/Group"
import GroupsIcon from "@mui/icons-material/Groups"
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo"
import ViewListIcon from "@mui/icons-material/ViewList"
import SettingsIcon from "@mui/icons-material/Settings"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import noUser from "../../assets/placeholders/perfil.webp"

interface IMenuOptions {
    label: string
    icon: React.ReactNode
    path: string
}

interface MenuPrincipalProps {}

export const MenuPrincipal: React.FC<MenuPrincipalProps> = ({}) => {
    const menuOptions: IMenuOptions[] = [
        { label: "Painel", icon: <ViewListIcon />, path: "/dashboard" },
        { label: "Categorias", icon: <ViewListIcon />, path: "/categories" },
        { label: "Cursos", icon: <PersonalVideoIcon />, path: "/courses" },
        { label: "Lições", icon: <AutoStoriesIcon />, path: "/lessons" },
        { label: "Aprovar", icon: <AssignmentTurnedInIcon />, path: "/check" },
        { label: "Grupos", icon: <GroupsIcon />, path: "/groups" },
        { label: "Usuários", icon: <GroupIcon />, path: "/users" },
    ]

    const navigate = useNavigate()
    const { user } = useUser()
    const role = user?.role.name

    const theme = useTheme()

    return (
        <Box sx={{}}>
            <Paper
                elevation={3}
                sx={{
                    width: theme.spacing(28),
                    position: "relative",
                    top: 0,
                    left: 0,
                    pl: "0.5vw",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ justifyContent: "center", m: "2.5vw 0 0.5vw", flexDirection: "column", gap: " 1vw", alignItems: "center" }}>
                    <Avatar
                        variant="circular"
                        sx={{
                            width: theme.spacing(12),
                            height: theme.spacing(12),
                        }}
                        src={user?.image || noUser}
                    />
                    <Typography variant="h2" component="h2" fontSize="1rem">
                        {user?.name}
                    </Typography>
                    <Typography mt="-1vw">{role}</Typography>
                </Box>
                <List sx={{ flex: 1 }}>
                    {menuOptions.map((menuOption) => (
                        <ListItemButton key={menuOption.path} onClick={() => navigate(menuOption.path)}>
                            <ListItemIcon>{menuOption.icon}</ListItemIcon>
                            <ListItemText>{menuOption.label}</ListItemText>
                        </ListItemButton>
                    ))}
                </List>
                <List>
                    <ListItemButton onClick={() => navigate("/settings")}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText>Configurações</ListItemText>
                    </ListItemButton>
                </List>
            </Paper>
        </Box>
    )
}
