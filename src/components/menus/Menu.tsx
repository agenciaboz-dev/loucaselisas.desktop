import React from "react"
import { Avatar, Box, List, Paper, Typography, useTheme } from "@mui/material"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import GroupIcon from "@mui/icons-material/Group"
import BadgeIcon from "@mui/icons-material/Badge"
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver"
import GroupsIcon from "@mui/icons-material/Groups"
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo"
import ViewListIcon from "@mui/icons-material/ViewList"
import SettingsIcon from "@mui/icons-material/Settings"
import { useUser } from "../../hooks/useUser"
import { MenuItem } from "./MenuItem"
import placeholders from "../../tools/placeholders"

interface IMenuOptions {
    label: string
    icon: React.ReactNode
    path: string
}

interface MenuPrincipalProps {}

export const MenuPrincipal: React.FC<MenuPrincipalProps> = ({}) => {
    const menuOptions: IMenuOptions[] = [
        { label: "Painel", icon: <ViewListIcon />, path: "/dashboard" },
        // { label: "Categorias", icon: <ViewListIcon />, path: "/categorias" },
        { label: "Cursos", icon: <PersonalVideoIcon />, path: "/cursos" },
        { label: "Lições", icon: <AutoStoriesIcon />, path: "/licoes" },
        // { label: "Aprovar", icon: <AssignmentTurnedInIcon />, path: "/aprovar" },
        { label: "Usuários", icon: <GroupIcon />, path: "/usuarios" },
        { label: "Criadores de Conteúdo", icon: <RecordVoiceOverIcon />, path: "/criadores" },
        { label: "Tipos de Usuários", icon: <BadgeIcon />, path: "/tipos-usuarios" },
        { label: "Grupos", icon: <GroupsIcon />, path: "/grupos" },
    ]

    const { user } = useUser()
    const role = user?.role.name

    const theme = useTheme()

    return (
        <Box sx={{}}>
            <Paper
                elevation={0}
                sx={{
                    width: "12vw",
                    position: "relative",
                    top: 0,
                    left: 0,
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "center",
                        m: "2vw 0 0.5vw",
                        flexDirection: "column",
                        gap: "0.5vw",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        variant="circular"
                        sx={{
                            width: theme.spacing(12),
                            height: theme.spacing(12),
                        }}
                        src={user?.image || placeholders.avatar}
                    />
                    <Typography variant="h3" component="h3" sx={{ textTransform: "uppercase" }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="h4" component="h4" mt="-0.5vw">
                        {role}
                    </Typography>
                </Box>
                <List sx={{ flex: 1 }}>
                    {menuOptions.map((menuOption) => (
                        <MenuItem key={menuOption.path} menuOption={menuOption} />
                    ))}
                </List>
                <List>
                    <MenuItem menuOption={{ path: "/configuracoes", icon: <SettingsIcon />, label: "Configurações" }} />
                </List>
            </Paper>
        </Box>
    )
}
