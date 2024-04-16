import React from "react";
import {
    Avatar,
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import ViewListIcon from "@mui/icons-material/ViewList";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

interface IMenuOptions {
    label: string;
    icon: React.ReactNode;
    path: string;
}

interface MenuPrincipalProps {}

export const MenuPrincipal: React.FC<MenuPrincipalProps> = ({}) => {
    const menuOptions: IMenuOptions[] = [
        { label: "Painel", icon: <ViewListIcon />, path: "/dashboard" },
        { label: "Cursos", icon: <PersonalVideoIcon />, path: "/courses" },
        { label: "Lições", icon: <AutoStoriesIcon />, path: "/lessons" },
        { label: "Aprovar", icon: <AssignmentTurnedInIcon />, path: "/check" },
        { label: "Grupos", icon: <GroupsIcon />, path: "/groups" },
        { label: "Usuários", icon: <GroupIcon />, path: "/users" },
    ];

    const navigate = useNavigate();

    const theme = useTheme();

    return (
        <Box sx={{}}>
            <Drawer
                variant="permanent"
                sx={{ width: theme.spacing(28) }}
                PaperProps={{
                    sx: {
                        width: theme.spacing(28),
                        position: "relative",
                        top: 0,
                        left: 0,
                        pl: "0.5vw",
                    },
                }}
            >
                <Box sx={{ justifyContent: "center", p: "1vw 0" }}>
                    <Avatar
                        variant="circular"
                        sx={{
                            width: theme.spacing(12),
                            height: theme.spacing(12),
                        }}
                    />
                </Box>
                <List sx={{ flex: 1 }}>
                    {menuOptions.map((menuOption) => (
                        <ListItemButton
                            key={menuOption.path}
                            onClick={() => navigate(menuOption.path)}
                        >
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
            </Drawer>
        </Box>
    );
};
